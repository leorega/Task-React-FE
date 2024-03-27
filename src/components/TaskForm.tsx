import { ChangeEvent, FormEvent, useState } from "react";
import { useTasks } from "../context/useTasks";
import { validate } from "../validations";

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false,
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });

    const { createTask } = useTasks();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
        if (!errors.title || !errors.description) createTask(task);
        setTask({
            title: "",
            description: "",
            done: false,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                    placeholder="Write a title"
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
                    className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                    placeholder="Write a description"
                    onChange={handleChange}
                    value={task.description}
                    required
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description}</span>
                )}
                <br />
                <label htmlFor="" className="inline-flex items-center gap-x-2">
                    <input
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600"
                        onChange={(e) =>
                            setTask({ ...task, done: e.target.checked })
                        }
                        checked={task.done}
                    />
                    <span>Done</span>
                </label>
                <button className="bg-indigo-500 px-3 block py-2 w-full">
                    Save
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
