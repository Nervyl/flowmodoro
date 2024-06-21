import "./Analytics.css";
import { useEffect, useState } from "react";

interface DayAndTime {
    date: string;
    timeWorked: number;
}

export default function Analytics() {
    const [timeToday, setTimeToday] = useState(0);

    const fetchAndSetTime = () => {
        chrome.storage.local.get(["timeWorked"], (result) => {
            const parsedDayAndTime: DayAndTime = JSON.parse(result.timeWorked);
            console.log("Setting timeToday to: ", parsedDayAndTime.timeWorked);
            setTimeToday(parsedDayAndTime.timeWorked);
        });
    };

    useEffect(() => {
        console.log("running useEffect");
        fetchAndSetTime();
    }, []);

    const formatTime = (time: number) => {
        const hours: number = Math.floor(time / 1000 / 60 / 60);
        const minutes: number = Math.floor((time / 1000 / 60) % 60);
        const seconds: number = Math.floor((time / 1000) % 60);
        return `${String(hours)}:${String(minutes).padStart(2, "0")}:${String(
            seconds
        ).padStart(2, "0")}`;
    };

    const timeDisplay = formatTime(timeToday);

    return (
        <div className="analytics--container">
            <div className="analytics--box">
                <h2 className="analytics--title">Time Spent Working Today!</h2>
                <h2 className="analytics--time">{timeDisplay}</h2>
            </div>
        </div>
    );
}
