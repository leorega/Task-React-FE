import { CreateTask, UpdateTask } from "../interfaces/Task.interface";

const API = "https://task-viewer-be.onrender.com/api";

//"https://task-viewer-be.onrender.com/api"
//"https://tasks-nest-be-production.up.railway.app/api" <= Expiró la prueba gratuita
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

export const getTasksByPriorityRequest = (user: string, priority: string) =>
    fetch(`${API}/tasks/${user}/priority/${priority}`);

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
