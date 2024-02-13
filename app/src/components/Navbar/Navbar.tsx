import "./Navbar.css";

export default function Navbar({
    selectedTab,
    setSelectedTab,
}: {
    selectedTab: string;
    setSelectedTab: (arg0: string) => void;
}) {
    return (
        <nav className="navbar--container">
            <button
                onClick={() => setSelectedTab("timer")}
                style={selectedTab === "timer" ? { opacity: "100%" } : {}}
                className="navbar--timer navbar--button"
            >
                <i className="fa-regular fa-clock"></i>
            </button>
            <button
                onClick={() => setSelectedTab("tasks")}
                style={selectedTab === "tasks" ? { opacity: "100%" } : {}}
                className="navbar--tasks navbar--button"
            >
                <i className="fa-solid fa-list-check"></i>
            </button>
            <button
                onClick={() => setSelectedTab("analytics")}
                style={selectedTab === "analytics" ? { opacity: "100%" } : {}}
                className="navbar--analytics navbar--button"
            >
                <i className="fa-solid fa-chart-simple"></i>
            </button>
            <button
                onClick={() => setSelectedTab("settings")}
                style={selectedTab === "settings" ? { opacity: "100%" } : {}}
                className="navbar--settings navbar--button"
            >
                <i className="fa-solid fa-gear"></i>
            </button>
        </nav>
    );
}
