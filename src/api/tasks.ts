import { CreateTask } from "../interfaces/Task.interface";

const API = "http://localhost:3000/api";

export const createTaskRequest = (task: CreateTask) =>
    fetch(`${API}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    });

export const getTasksRequest = () => fetch(`${API}/tasks`);
