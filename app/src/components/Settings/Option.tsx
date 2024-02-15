import { ChangeEventHandler } from "react";

export default function Option({
    name,
    text,
    type,
    value,
    handleChange,
}: {
    name: string;
    text: string;
    type: string;
    value: number | string | undefined;
    handleChange: ChangeEventHandler;
}) {
    return (
        <div className="settings--option-container">
            <h3 className="settings--option-text">{text ?? ""}</h3>
            <input
                name={name}
                onChange={handleChange}
                value={value ?? ""}
                className={`settings--${type ?? ""} settings--option-input`}
                type={type ?? ""}
            />
        </div>
    );
}
