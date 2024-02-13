import "./App.css";
import Header from "./components/Header/Header";
import Timer from "./components/Timer/Timer";
import Coming from "./components/Coming/Coming";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
// import { chrome } from "chrome";

export default function App() {
    const [selectedTab, setSelectedTab] = useState("timer");
    const [status, setStatus] = useState("break");

    useEffect(
        () =>
            chrome.runtime.onMessage.addListener((request: { action: string; status: string }) => {
                console.log("App message received", request);
                if (request.action === "updateStatus") setStatus(request.status);
            }),
        []
    );

    useEffect(
        () =>
            chrome.storage.local.get(["status"], (result) => {
                try {
                    setStatus(result.status);
                } catch (error) {
                    console.log(error);
                }
            }),
        []
    );

    const headerText: string | undefined = {
        timer: {
            work: "Get to Work!",
            break: "Take a Break!",
            pause: "Start the Timer!",
        }[status],
        tasks: "Tasks",
        analytics: "Analytics",
        settings: "Settings",
    }[selectedTab];

    const mainElement = selectedTab === "timer" ? <Timer status={status} /> : <Coming />;

    console.log("App Rendered", status);

    return (
        <div className="app-container">
            <Header text={headerText} />
            {mainElement}
            <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
    );
}
