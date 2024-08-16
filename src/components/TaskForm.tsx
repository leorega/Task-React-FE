import { ChangeEvent, FormEvent, useState } from "react";
import { useTasks } from "../context/useTasks";
import { validate } from "../validations";
import { useAuth0 } from "@auth0/auth0-react";

const TaskForm = () => {
    const { user } = useAuth0();

    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false,
        user: user?.name ? user.name : "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });

    const { createTask, errorMessage, setErrorMessage } = useTasks();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setErrorMessage("");
        setTask({ ...task, [e.target.name]: e.target.value });
        setErrors(
            validate({
                ...task,
                [e.target.name]: e.target.value,
            })
        );
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!errors.title && !errors.description) createTask(task);

        setTask({
            title: "",
            description: "",
            done: false,
            user: user?.name ? user.name : "",
        });
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <span className="text-yellow-500 font-bold">
                        {errorMessage}
                    </span>
                )}
                <input
                    type="text"
                    name="title"
                    className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                    placeholder="Título de la tarea"
                    onChange={handleChange}
                    value={task.title}
                    required
                />
                {errors.title && (
                    <span className="text-red-500">{errors.title}</span>
                )}
                <textarea
                    name="description"
                    rows={3}
                    className="resize-none border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                    placeholder="Descripción de la tarea"
                    onChange={handleChange}
                    value={task.description}
                    required
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description}</span>
                )}
                <button className="bg-indigo-500 text-black block w-full h-10 rounded-sm font-bold hover:bg-indigo-800 hover:text-white hover:border-2 hover:font-bold duration-500 box-border">
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
