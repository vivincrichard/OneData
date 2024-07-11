import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Tasks {
    id: string;
    task: string;
    editing: boolean;
}

const TodoList = () => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [newTaskInput, setNewTaskInput] = useState<string>('');
    const [editTaskInput, setEditTaskInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<Tasks[]>('https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task');
            const output = response.data;
            setTasks(output);
            setIsLoading(false);
        } catch (error) {
            console.log('the console error is', error);
            setError('Error in this page');
        }
    };

    const addTask = async () => {
        try {
            const response = await axios.post<Tasks>('https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task', { task: newTaskInput });
            setTasks([...tasks, { ...response.data }]);
            setNewTaskInput('');
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Error adding task. Please try again later.');
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await axios.delete(`https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.log(error);
            setError('Error in deleting id');
        }
    };

    const editTask = (id: string) => {
        const t = tasks.find((task) => task.id === id);
        if (t) {
            setEditTaskInput(t.task);
            const edit = tasks.map(task => {
                if (task.id === id) {
                    return { ...task, editing: true };
                }
                return task;
            });
            setTasks(edit);
        }
    };

    const updateTask = async (id: string) => {
        try {
            const response = await axios.put<Tasks>(`https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task/${id}`, { task: editTaskInput });
            const update = tasks.map((task) => {
                if (task.id === id) {
                    return { ...response.data, editing: false };
                }
                return task;
            });
            setTasks(update);
        } catch (error) {
            setError('Error in update or put request');
        }
    };

    if (isLoading) {
        return <h1>Loading</h1>;
    }

    if (error) {
        return <h1>Error in page... Reload page</h1>;
    }

    const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Task List</h2>
            <div className="mb-5">
                <div className="input-group">
                    <input className="form-control"
                        type="text"
                        placeholder="Enter your task"
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)} />
                    <button className="btn btn-success" onClick={addTask}>Add Task</button>
                </div>
            </div>
            <div className="mb-5">
                <div className="input-group">
                    <input className="form-control"
                        type="text"
                        placeholder="Search tasks"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
            </div>
            <div>
                <ul className="list-group">
                    {filteredTasks.map((task) => (
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
                                        <button className="btn btn-outline-primary" onClick={() => updateTask(task.id)}>Update</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h4>{task.task}</h4>
                                    <div>
                                        <button className="btn btn-danger m-2" onClick={() => deleteTask(task.id)}>Delete</button>
                                        <button className="btn btn-primary" onClick={() => editTask(task.id)}>Edit</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
