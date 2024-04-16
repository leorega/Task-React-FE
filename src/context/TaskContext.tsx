import { createContext, useEffect, useState } from "react";
import {
    createTaskRequest,
    deleteTaskRequest,
    getTasksRequest,
    updateTaskRequest,
} from "../api/tasks";
import { CreateTask, Task, UpdateTask } from "../interfaces/Task.interface";
import { useAuth0 } from "@auth0/auth0-react";

interface TaskContextValue {
    tasks: Task[];
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    createTask: (task: CreateTask) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    errorMessage: "",
    setErrorMessage: () => {},
    createTask: async () => {},
    deleteTask: async () => {},
    updateTask: async () => {},
});

interface Props {
    children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    const { user } = useAuth0();

    useEffect(() => {
        getTasksRequest(user.name)
            .then((res) => res.json())
            .then((data) => setTasks(data.reverse()));
    }, []);

    const createTask = async (task: CreateTask) => {
        try {
            const res = await createTaskRequest(task);
            if (res.status === 409)
                throw new Error("Ya existe una tarea con ese nombre");

            const data = await res.json();
            setTasks([data, ...tasks]);
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                console.error("Se produjo un error desconocido:", error);
            }
        }
    };

    const deleteTask = async (id: string) => {
        const res = await deleteTaskRequest(id);
        if (res.status === 204)
            setTasks(tasks.filter((task) => task._id !== id));
    };

    const updateTask = async (id: string, task: UpdateTask) => {
        const res = await updateTaskRequest(id, task);
        const data = await res.json();
        setTasks(
            tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
        );
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                errorMessage,
                setErrorMessage,
                createTask,
                deleteTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
