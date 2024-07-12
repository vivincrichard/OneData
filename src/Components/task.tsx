import { Tasks } from "./type";
import { useState } from "react";
import { Pen, XCircle } from 'react-bootstrap-icons';

interface TaskProps {
    task: Tasks;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onUpdate: (id: string, newTask: string) => void;
}

const Task = ({ task, onDelete, onEdit, onUpdate }: TaskProps) => {
    const [editTaskInput, setEditTaskInput] = useState<string>(task.task);

    const handleUpdate = () => {
        onUpdate(task.id, editTaskInput);
    };

    return (
        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {task.editing ? (
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={editTaskInput}
                        onChange={(e) => setEditTaskInput(e.target.value)}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-success" onClick={handleUpdate}><Pen /> Update</button>
                    </div>
                </div>
            ) : (
                <>
                    <h4>{task.task}</h4>
                    <div>
                        <button className="btn btn-danger m-2" onClick={() => onDelete(task.id)}><XCircle /> Delete</button>
                        <button className="btn btn-primary" onClick={() => onEdit(task.id)}>Edit</button>
                    </div>
                </>
            )}
        </li>
    );
};

export default Task;
