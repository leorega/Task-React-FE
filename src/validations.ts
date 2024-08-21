import { CreateTask } from "./interfaces/Task.interface";

export const validate = (input: CreateTask) => {
    const errors = { title: "", description: "", priority: "" };

    if (!input.title) errors.title = "Debes agregar un título";
    if (input.title.length > 50) errors.title = "El nombre es demasiado largo";

    if (!input.description)
        errors.description = "Debes agregar una descripción";

    if (!input.priority) errors.priority = "Debes agregar una prioridad";

    return errors;
};
