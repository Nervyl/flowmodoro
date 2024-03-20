import Task from "./Task";
import Form from "./Form";
import { useState, useEffect } from "react";
import "./Tasks.css";

export default function Tasks() {
    // const [completedTasks, setCompletedTasks] = useState([]);
    // const [scrappedTasks, setScrappedTasks] = useState([]);

    type TaskObject = {
        title: string;
        description: string;
        isCrossed: boolean;
        priority: string;
        id: string;
    };

    const [tasks, setTasks] = useState<TaskObject[]>([]);

    useEffect(() => {
        chrome.storage.local.get(["tasks"], (result) => {
            setTasks(result.tasks);
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({ tasks: tasks.filter((task: TaskObject) => !task.isCrossed) });
    }, [tasks]);

    const [inEditMode, setInEditMode] = useState(false);

    function toggleCrossed(id: string) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id == id ? { ...task, isCrossed: !task.isCrossed } : task
            )
        );
    }

    function toggleEditMode() {
        setInEditMode((prevMode) => !prevMode);
    }

    function addTask(task: TaskObject) {
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    const taskElements = [...tasks]
        .sort((a, b) => {
            const priorityToNum = (priority: string) => {
                if (priority === "red") return -1;
                if (priority === "yellow") return 0;
                if (priority === "green") return 1;
                else return 0;
            };

            return priorityToNum(a.priority) - priorityToNum(b.priority);
        })
        .map((task) => {
            return <Task toggleCrossed={() => toggleCrossed(task.id)} key={task.id} task={task} />;
        });

    return (
        <div className="tasks--container">
            {inEditMode ? (
                <Form addTask={addTask} toggleEditMode={toggleEditMode} />
            ) : (
                <button
                    className="tasks--new-container"
                    onClick={() => setInEditMode((prevMode) => !prevMode)}
                >
                    <h4 className="tasks--new-title">{"add a new task"}</h4>
                </button>
            )}
            {taskElements}
        </div>
    );
}
