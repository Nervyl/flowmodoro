import Option from "./Option";
import "./Settings.css";
import { ChangeEvent, useEffect, useState } from "react";

export default function Settings() {
    const defaultSettings = {
        divisor: 5,
        colorWork: "#FF3737",
        colorBreak: "#5FFF5C",
        colorPause: "#FBFF37",
        volume: 100,
    };

    const [formData, setFormData] = useState(defaultSettings);

    useEffect(() => {
        chrome.storage.local.get(["divisor", "colors", "volume"], (result) => {
            try {
                setFormData({
                    divisor: result.divisor,
                    colorWork: result.colors.work,
                    colorBreak: result.colors.break,
                    colorPause: result.colors.pause,
                    volume: result?.volume,
                });
            } catch (error) {
                console.error(error);
            }
        });
    }, []);

    useEffect(() => {
        // Change the text color on wrong input.
        const [divisorElement] = document.getElementsByName("divisor");
        divisorElement.style.color = "#FF0000";
        if (formData.divisor < 1 || formData.divisor > 999) return;
        divisorElement.style.color = "#000000";

        const debounceTimer = setTimeout(() => {
            chrome.storage.local.set({
                divisor: formData.divisor,
                colors: { work: formData.colorWork, break: formData.colorBreak, pause: formData.colorPause },
                volume: formData.volume,
            });
            console.log("Debounced chrome set ran!");
        }, 500);

        return () => {
            console.log("Debouncing/canceling timeout!");
            clearTimeout(debounceTimer);
        };
    }, [formData]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function resetSettings() {
        setFormData(defaultSettings);
    }

    return (
        <div className="settings--container">
            <section className="settings--section-container">
                <h4 className="settings--section-title">functionality</h4>
                <Option
                    handleChange={handleChange}
                    name="divisor"
                    text="Divisor"
                    type="number"
                    value={formData.divisor}
                />
            </section>

            <section className="settings--section-container">
                <h4 className="settings--section-title">colors</h4>
                <Option
                    handleChange={handleChange}
                    name="colorWork"
                    text="Work color"
                    type="color"
                    value={formData.colorWork}
                />
                <Option
                    handleChange={handleChange}
                    name="colorBreak"
                    text="Break color"
                    type="color"
                    value={formData.colorBreak}
                />
                <Option
                    handleChange={handleChange}
                    name="colorPause"
                    text="Pause color"
                    type="color"
                    value={formData.colorPause}
                />
            </section>

            <section className="settings--section-container">
                <h4 className="settings--section-title">notifications </h4>
                <Option handleChange={handleChange} name="volume" text="Volume" type="range" value={formData.volume} />
            </section>

            <div className="settings--button-container">
                <button onClick={resetSettings} className="settings--reset-button">
                    Reset
                </button>
            </div>
        </div>
    );
}
