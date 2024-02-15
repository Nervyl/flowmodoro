chrome.runtime.onStartup.addListener(() => {});

// Init local storage
chrome.storage.local.get(["colors", "status", "time", "divisor", "volume", "startStamp"], (result) => {
    console.log("Initializing local storage!");

    chrome.storage.local.set(
        {
            colors: result.colors ?? {
                work: "#FF3737",
                break: "#5FFF5C",
                pause: "#FBFF37",
            },
            status: result.status ?? "pause",
            time: result.time ?? 0,
            divisor: result.divisor ?? 5,
            volume: result.volume ?? 50,
            startStamp: result.startStamp ?? 0,
        },
        () => {
            console.log("Running the code to start the script...");
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                if (result.status === "work") startWork();
                else if (result.status === "break" || result.status === "pause") startPause();
                else console.log("None started!", result.status);
            }
        }
    );
});

chrome.runtime.onMessage.addListener(async (request: { action: string; data: string }) => {
    console.log("message received");
    if (request.action === "handleTimerClick") handleTimerClick();
});

function handleTimerClick() {
    console.log("handleTimerClick received");
    chrome.storage.local.get(["status"], (result) => {
        try {
            if (result.status === "pause") startWork();
            else if (result.status === "work") startBreak();
            else if (result.status === "break") startPause();
        } catch (err) {
            console.log(err);
        }
    });
}

function startWork() {
    console.log("Starting work!");
    const status = "work";
    chrome.storage.local.set({ status });
    chrome.runtime.sendMessage({ action: "updateStatus", status });
    console.log("Changing the icon to red!");

    chrome.storage.local.get(["time", "startStamp"], (result) => {
        try {
            const currentTime = Date.now();
            const startTime = result.time <= 0 ? currentTime : result.startStamp;
            const browserClosedTime = currentTime - (startTime + result.time);
            if (result.time > 0) {
                console.log(
                    "Interrupted session detected",
                    "Time:",
                    result.time,
                    "Browser closed time in seconds:",
                    browserClosedTime / 1000
                );
            }

            const maxAllowedBrowserCloseTime = 5 * 60 * 1000;

            if (browserClosedTime > maxAllowedBrowserCloseTime) {
                console.log("Terminating interrupted work session", browserClosedTime);
                startPause();
                return;
            }

            chrome.browserAction.setIcon({ path: "../icons/icon-work.png" });
            chrome.storage.local.set({ startStamp: startTime });

            const updateTime = () => {
                console.log("Updating time here...");
                chrome.storage.local.get(["status"], (result) => {
                    try {
                        const currentTime = Date.now();
                        const time = currentTime - startTime;
                        chrome.storage.local.set({ time });

                        if (result.status !== "work") return;

                        chrome.runtime.sendMessage({ action: "updateTime", time });
                        console.log("Sending message - Work", time, status);

                        setTimeout(updateTime, 200);
                    } catch (error) {
                        console.log(error);
                    }
                });
            };

            updateTime();
        } catch (error) {
            console.error(error);
        }
    });
}

function startBreak() {
    console.log("Starting break!");
    const status = "break";
    chrome.runtime.sendMessage({ action: "updateStatus", status });

    chrome.storage.local.set({ status });
    chrome.browserAction.setIcon({ path: "../icons/icon-break.png" });
    console.log("Changing the icon to green!");

    chrome.storage.local.get(["time", "divisor"], (result) => {
        try {
            const time = Math.floor(result.time / result.divisor);
            console.log("break calculation: ", result.time, "/", result.divisor, "=", time);
            chrome.storage.local.set({ time });
            chrome.runtime.sendMessage({ action: "updateTime", time });
            const breakTime = time;
            const startTime = Date.now();

            const updateTime = () => {
                chrome.storage.local.get(["status"], (result) => {
                    try {
                        if (result.status !== "break") return;

                        const currentTime = Date.now();
                        const elapsedTime = currentTime - startTime;
                        const time = breakTime - elapsedTime;
                        chrome.storage.local.set({ time });
                        chrome.runtime.sendMessage({ action: "updateTime", time });
                        // console.log("Sending message - Break", time, status);

                        if (time <= 0) {
                            playAudio();
                            startPause();
                        }

                        setTimeout(updateTime, 200);
                    } catch (error) {
                        console.log(error);
                    }
                });
            };

            updateTime();
        } catch (error) {
            console.log(error);
        }
    });
}

function startPause() {
    console.log("Starting pause!");
    const time = 0;
    const status = "pause";
    chrome.browserAction.setIcon({ path: "../icons/icon-pause.png" });
    console.log("Changing the icon to yellow!");
    chrome.storage.local.set({ time, status });
    chrome.runtime.sendMessage({ action: "updateTime", time });
    chrome.runtime.sendMessage({ action: "updateStatus", status });
    console.log("Sending message - Pause", time, status);
}

function playAudio() {
    const audio = new Audio("../sounds/alarm.wav");
    chrome.storage.local.get(["volume"], (result) => {
        audio.volume = result.volume / 100;
        console.log("AUDIO VOLUME:", audio.volume);
        audio.play();
    });
}
