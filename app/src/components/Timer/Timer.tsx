import "./Timer.css";
import { useState } from "react";

export default function Timer() {
    const [time] = useState(123124);

    const formatTime = (time: number) => {
        const minutes: number = Math.floor(time / 1000 / 60);
        const seconds: number = Math.floor((time / 1000) % 60);
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const timeDisplay = formatTime(time);

    return (
        <div className="timer--container">
            <button className="timer--button">
                <div className="timer--outer-circle"></div>
                <div className="timer--inner-circle"></div>
                <h2 className="timer--time">{timeDisplay}</h2>
            </button>
        </div>
    );
}
