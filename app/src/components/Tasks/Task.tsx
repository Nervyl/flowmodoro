import "./Tasks.css";

type TaskObject = {
    title: string;
    description: string;
    isCrossed: boolean;
    priority: string;
    id: string;
};

export default function Task({ task, toggleCrossed }: { task: TaskObject; toggleCrossed: () => void }) {
    const { title, description, priority, isCrossed } = task;

    return (
        <button onClick={toggleCrossed} className={`tasks--item-container ${isCrossed && "low-opacity"}`}>
            <div className="tasks--item-title-container">
                <h4 className={`tasks--item-circle ${priority}`}>⬤</h4>
                <h4 className={`tasks--item-title ${isCrossed && "crossed-text"}`}>{title}</h4>
            </div>
            {description && (
                <div className="tasks--item-description-container">
                    <p className={`tasks--item-description ${isCrossed && "crossed-text"}`}>{description} </p>
                </div>
            )}{" "}
        </button>
    );
}
