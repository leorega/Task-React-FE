import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../interfaces/Task.interface";
import { useTasks } from "../context/useTasks";
import { useAuth0 } from "@auth0/auth0-react";
import CloseButton from "./CloseButton";

interface Props {
    task: Task;
    setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditForm = ({ task, setIsOpenEdit }: Props) => {
    const { user } = useAuth0();
    const { updateTask } = useTasks();

    const [editTask, setEditTask] = useState({
        title: task.title || "",
        description: task.description || "",
        done: task.done || false,
        user: user?.name || "",
        priority: task.priority,
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditTask({
            ...editTask,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateTask(task._id as string, editTask);
        setIsOpenEdit(false);
    };

    return (
        <div className="bg-black bg-opacity-80 fixed top-0 left-0 h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-gray-950 rounded-sm border-2 border-indigo-500 p-4 flex flex-col items-center w-4/5 md:w-2/5">
                <h2 className="text-2xl">Editá tu tarea</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        name="title"
                        className="border-2 p-2 rounded-sm bg-zinc-800 block w-full my-2"
                        placeholder="Título de la tarea"
                        onChange={handleChange}
                        value={editTask.title}
                        required
                    />
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        name="description"
                        rows={3}
                        className="resize-none border-2 p-2 rounded-sm bg-zinc-800 block w-full my-2"
                        placeholder="Descripción de la tarea"
                        onChange={handleChange}
                        value={editTask.description}
                        required
                    ></textarea>
                    <div className="my-4">
                        <div className="flex gap-4">
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-import"
                                    className="mr-2 peer"
                                    type="radio"
                                    name="priority"
                                    value="importante"
                                    onChange={handleChange}
                                    checked={editTask.priority === "importante"}
                                />
                                <label
                                    htmlFor="priority-import"
                                    className="flex items-center border-2 border-red-500 p-2 rounded-md text-red-500 cursor-pointer peer-checked:bg-red-500 peer-checked:text-white"
                                >
                                    Importante
                                </label>
                            </div>
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-norm"
                                    type="radio"
                                    name="priority"
                                    value="normal"
                                    onChange={handleChange}
                                    checked={editTask.priority === "normal"}
                                    className="mr-2 peer"
                                />
                                <label
                                    htmlFor="priority-norm"
                                    className="flex items-center border-2 border-yellow-300 p-2 rounded-md text-yellow-300 cursor-pointer peer-checked:bg-yellow-300 peer-checked:text-black"
                                >
                                    Normal
                                </label>
                            </div>
                            <div>
                                <input
                                    hidden={true}
                                    id="priority-tranq"
                                    type="radio"
                                    name="priority"
                                    value="tranqui"
                                    onChange={handleChange}
                                    checked={editTask.priority === "tranqui"}
                                    className="mr-2 peer"
                                />
                                <label
                                    htmlFor="priority-tranq"
                                    className="flex items-center border-2 border-green-500 p-2 rounded-md text-green-500 cursor-pointer peer-checked:bg-green-500 peer-checked:text-white"
                                >
                                    Tranqui
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className="bg-indigo-500 block w-full h-10 hover:border-2 box-border">
                        Guardar
                    </button>
                </form>
                <CloseButton onClick={() => setIsOpenEdit(false)} />
            </div>
        </div>
    );
};

export default EditForm;
