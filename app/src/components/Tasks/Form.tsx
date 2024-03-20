import { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";

type TaskObject = {
    title: string;
    description: string;
    isCrossed: boolean;
    priority: string;
    id: string;
};

export default function Form({
    addTask,
    toggleEditMode,
}: {
    addTask: (task: TaskObject) => void;
    toggleEditMode: () => void;
}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "yellow",
    });

    function handleConfirm() {
        addTask({ ...formData, isCrossed: false, id: nanoid() });
        toggleEditMode();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function selectRed() {
        setFormData((prevFormData) => ({
            ...prevFormData,
            priority: "red",
        }));
    }

    function selectYellow() {
        setFormData((prevFormData) => ({
            ...prevFormData,
            priority: "yellow",
        }));
    }

    function selectGreen() {
        setFormData((prevFormData) => ({
            ...prevFormData,
            priority: "green",
        }));
    }

    return (
        <div className="tasks--form-container">
            <input
                onChange={handleChange}
                name="title"
                value={formData.title}
                className="tasks--input-title"
                placeholder="Title"
                type="text"
            />
            <input
                onChange={handleChange}
                name="description"
                value={formData.description}
                className="tasks--input-description"
                placeholder="Description"
                type="text"
            />
            <div className="tasks--form-button-container">
                <button onClick={selectRed} className="tasks--select-priority" name="red">
                    <h4
                        className={`tasks--item-circle red ${
                            formData.priority != "red" && "low-opacity"
                        }`}
                    >
                        ⬤
                    </h4>
                </button>

                <button onClick={selectYellow} className="tasks--select-priority" name="yellow">
                    <h4
                        className={`tasks--item-circle yellow ${
                            formData.priority != "yellow" && "low-opacity"
                        }`}
                    >
                        ⬤
                    </h4>
                </button>
                <button onClick={selectGreen} className="tasks--select-priority" name="green">
                    <h4
                        className={`tasks--item-circle green ${
                            formData.priority != "green" && "low-opacity"
                        }`}
                    >
                        ⬤
                    </h4>
                </button>

                <button
                    onClick={handleConfirm}
                    className="tasks--form-confirm-task tasks--form-button"
                >
                    ✓
                </button>
                <button
                    onClick={toggleEditMode}
                    className="tasks--form-scrap-task tasks--form-button"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
