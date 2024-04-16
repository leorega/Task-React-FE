import { CreateTask, UpdateTask } from "../interfaces/Task.interface";

const API = "https://tasks-nest-be-production.up.railway.app/api";

//"https://tasks-nest-be-production.up.railway.app/api"
//"http://localhost:3000/api"

export const createTaskRequest = (task: CreateTask) =>
    fetch(`${API}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    });

export const getTasksRequest = (user: string) => fetch(`${API}/tasks/${user}`);

export const deleteTaskRequest = (id: string) =>
    fetch(`${API}/tasks/${id}`, { method: "DELETE" });

export const updateTaskRequest = (id: string, task: UpdateTask) =>
    fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
            "Content-Type": "application/json",
        },
    });
