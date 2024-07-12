import { useState } from "react";

interface TaskInputProps {
    onAddTask: (task: string) => void;
}

const TaskInput = ({ onAddTask } : TaskInputProps) => {
    const [newTaskInput, setNewTaskInput] = useState<string>('');

    const handleAddTask = () => {
        if (newTaskInput.trim() !== '') {
            onAddTask(newTaskInput);
            setNewTaskInput('');
        }
    };

    return (
        <div className="mb-5">
            <div className="input-group">
                <input className="form-control"
                    type="text"
                    placeholder="Enter your task"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)} />
                <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};

export default TaskInput;
