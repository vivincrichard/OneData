import { useState, useEffect } from "react";
import axios from "axios";
import Task from "./task";
import TaskInput from "./taskInput";
import { Tasks } from "./type";
import 'bootstrap/dist/css/bootstrap.min.css';


const TodoList = () => {
    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<Tasks[]>('https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task');
            setTasks(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again later.');
        }
    };

    const addTask = async (newTask: string) => {
        try {
            const response = await axios.post<Tasks>('https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task', { task: newTask });
            setTasks([...tasks, { ...response.data }]);
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
            console.error('Error deleting task:', error);
            setError('Error deleting task. Please try again later.');
        }
    };

    const editTask = (id: string) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, editing: true };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const updateTask = async (id: string, newTask: string) => {
        try {
            const response = await axios.put<Tasks>(`https://668e3ed7bf9912d4c92d6591.mockapi.io/api/v1/task/${id}`, { task: newTask });
            const updatedTasks = tasks.map(task => {
                if (task.id === id) {
                    return { ...response.data, editing: false };
                }
                return task;
            });
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Error updating task. Please try again later.');
        }
    };

    const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchQuery.toLowerCase()));

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Task List</h2>
            <TaskInput onAddTask={addTask} />
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
                        <Task
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onEdit={editTask}
                            onUpdate={updateTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
