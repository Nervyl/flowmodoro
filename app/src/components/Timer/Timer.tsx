import "./Timer.css";
import { useState, useEffect } from "react";

export default function Timer({ status }: { status: string }) {
    /* Display correct time. */

    const [time, setTime] = useState<number>(0);

    // Fetch the correct time
    useEffect(() => {
        chrome.storage.local.get(["time"], (result) => {
            setTime(result.time);
        });
    }, []);

    // Listens for updateTime messages

    useEffect(
        () =>
            chrome.runtime.onMessage.addListener((request: { action: string; time: number }) => {
                console.log("Timer message received", request);

                if (request.action === "updateTime") setTime(request.time);
            }),
        []
    );

    const formatTime = (time: number) => {
        const minutes: number = Math.floor(time / 1000 / 60);
        const seconds: number = Math.floor((time / 1000) % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const timeDisplay = formatTime(time);

    const handleTimerClick = () => chrome.runtime.sendMessage({ action: "handleTimerClick" });

    /* Apply correct styling */

    const [style, setStyle] = useState<object>({});

    // Fetch colors and set appropriate colors
    useEffect(() => {
        chrome.storage.local.get(["colors"], (result) => {
            const currentColor = (result.colors as { [key: string]: string })[status];

            setStyle(() => ({
                background: `${currentColor}`,
                boxShadow: `0px 0px 10px ${currentColor}`,
            }));
        });
    }, [status]);

    console.log("Timer Rendered", time, status);

    return (
        <div className="timer--container">
            <button className="timer--button" onClick={handleTimerClick}>
                <div style={style} className="timer--outer-circle"></div>
                <div className="timer--inner-circle"></div>
                <h2 className="timer--time">{timeDisplay}</h2>
            </button>
        </div>
    );
}
