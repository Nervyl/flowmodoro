import Option from "./Option";
import "./Settings.css";

export default function Settings() {
    return (
        <div className="settings--container">
            <section className="settings--section-container">
                <h4 className="settings--section-title">functionality</h4>
                <Option text="Divisor" type="number" />
            </section>

            <section className="settings--section-container">
                <h4 className="settings--section-title">colors</h4>
                <Option text="Work color" type="color" />
                <Option text="Break color" type="color" />
                <Option text="Pause color" type="color" />
            </section>

            <section className="settings--section-container">
                <h4 className="settings--section-title">notifications </h4>
                <Option text="Volume" type="range" />
            </section>
        </div>
    );
}
