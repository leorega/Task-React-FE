import { CreateTask } from "./interfaces/Task.interface";

export const validate = (input: CreateTask) => {
    const errors = { title: "", description: "" };

    if (!input.title) errors.title = "You must add a name";
    if (input.title.length > 50) errors.title = "The name is too long";

    if (!input.description) errors.description = "You must add a description";

    return errors;
};
