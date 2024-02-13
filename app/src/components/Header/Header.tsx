import "./Header.css";

export default function Header({ text }: { text: string | undefined }) {
    return (
        <header className="header--container">
            <h2 className="header--text">{text}</h2>
        </header>
    );
}
