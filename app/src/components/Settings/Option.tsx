export default function Option({ text, type }: { text: string; type: string }) {
    return (
        <div className="settings--option-container">
            <h3 className="settings--option-text">{text}</h3>
            <input className={`settings--${type} settings--option-input`} type={type} />
        </div>
    );
}
