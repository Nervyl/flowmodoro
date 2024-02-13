import "./App.css";
import Header from "./components/Header/Header";
import Timer from "./components/Timer/Timer";
import Coming from "./components/Coming/Coming";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

export default function App() {
    const [selectedTab, setSelectedTab] = useState("timer");
    const headerText: string = "Start the Timer!";
    const mainElement = selectedTab === "timer" ? <Timer /> : <Coming />;

    return (
        <div className="app-container">
            <Header text={headerText} />
            {mainElement}
            <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
    );
}
