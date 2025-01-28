import { ChangeEvent, FormEvent, useState } from "react";
import { useTasks } from "../context/useTasks";
import { validate } from "../validations";
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

const TaskForm = () => {
    const { user } = useAuth0();

    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false,
        priority: "",
        user: user?.name ? user.name : "",
    });

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        priority: "",
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

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
        if (!errors.title && !errors.description && !errors.priority) {
            createTask(task);
        }
        setTask({
            title: "",
            description: "",
            done: false,
            priority: "",
            user: user?.name ? user.name : "",
        });
    };

    return (
        <div className="mt-4">
            <div
                onClick={() => {
                    if (isFormVisible) {
                        setTask({
                            title: "",
                            description: "",
                            done: false,
                            priority: "",
                            user: user?.name ? user.name : "",
                        });
                        setErrors({
                            title: "",
                            description: "",
                            priority: "",
                        });
                    }
                    setIsFormVisible(!isFormVisible);
                }}
                className="w-1/4 flex-col items-center justify-center mx-auto"
            >
                <h3 className="text-center text-xl">Crear tarea</h3>
                {!isFormVisible ? (
                    <FaArrowCircleDown className="mx-auto text-3xl my-1 animate-pulse text-indigo-500 cursor-pointer" />
                ) : (
                    <FaArrowCircleUp className="mx-auto text-3xl my-1 animate-pulse text-indigo-500 cursor-pointer" />
                )}
            </div>
            <div
                className={`p-2 overflow-hidden transition-all duration-500 ease-in-out ${
                    isFormVisible
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
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
                        <span className="text-red-500">
                            {errors.description}
                        </span>
                    )}

                    <div className="my-4">
                        <div className="flex gap-4 items-center">
                            <p className="font-bold hidden md:block">
                                Prioridad:
                            </p>
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-importante"
                                    className="mr-2 peer"
                                    type="radio"
                                    name="priority"
                                    value="importante"
                                    onChange={handleChange}
                                    checked={task.priority === "importante"}
                                />
                                <label
                                    htmlFor="priority-importante"
                                    className="flex items-center border-2 border-red-500 p-2 rounded-md text-red-500 cursor-pointer peer-checked:bg-red-500 peer-checked:text-white"
                                >
                                    Importante
                                </label>
                            </div>
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-normal"
                                    type="radio"
                                    name="priority"
                                    value="normal"
                                    onChange={handleChange}
                                    checked={task.priority === "normal"}
                                    className="mr-2 peer"
                                />
                                <label
                                    htmlFor="priority-normal"
                                    className="flex items-center border-2 border-yellow-300 p-2 rounded-md text-yellow-300 cursor-pointer peer-checked:bg-yellow-300 peer-checked:text-black"
                                >
                                    Normal
                                </label>
                            </div>
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-tranqui"
                                    type="radio"
                                    name="priority"
                                    value="tranqui"
                                    onChange={handleChange}
                                    checked={task.priority === "tranqui"}
                                    className="mr-2 peer"
                                />
                                <label
                                    htmlFor="priority-tranqui"
                                    className="flex items-center border-2 border-green-500 p-2 rounded-md text-green-500 cursor-pointer peer-checked:bg-green-500 peer-checked:text-white"
                                >
                                    Tranqui
                                </label>
                            </div>
                        </div>
                        {errors.priority && (
                            <span className="text-red-500">
                                {errors.priority}
                            </span>
                        )}
                    </div>
                    <button className="bg-indigo-500 text-black block w-full h-10 rounded-sm font-bold hover:bg-indigo-800 hover:text-white hover:border-2 hover:font-bold duration-500 box-border">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
