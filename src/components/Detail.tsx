import { useState } from "react";
import { Task } from "../interfaces/Task.interface";
import EditForm from "./EditForm";
import CloseButton from "./CloseButton";

interface Props {
    task: Task;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = ({ task, setIsOpen }: Props) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    return (
        <div className="bg-black bg-opacity-80 fixed top-0 left-0 h-full w-full z-50 flex items-center justify-center">
            {isOpenEdit && (
                <EditForm task={task} setIsOpenEdit={setIsOpenEdit} />
            )}
            <div
                className={`bg-gray-950 rounded-sm border-2 ${
                    task.priority === "importante" && "border-red-500"
                } ${task.priority === "normal" && "border-yellow-300"} ${
                    task.priority === "tranqui" && "border-green-500"
                } p-4 flex flex-col items-center w-4/5 md:w-2/5 relative`}
            >
                {task.done ? (
                    <p className="mt-2 text-green-500">Tarea completada</p>
                ) : (
                    <p className="mt-2 text-red-500">Tarea pendiente</p>
                )}
                <h2 className="text-3xl text-yellow-300 mb-4 px-4">
                    {task.title}
                </h2>
                <p className="border-y-2 p-4">{task.description}</p>
                <button
                    className="block w-2/5 border-2 border-indigo-500 text-indigo-500 p-1 hover:font-bold hover:text-white duration-300 my-4 box-border"
                    onClick={() => setIsOpenEdit(true)}
                >
                    Editar
                </button>
                <p className="text-sm font-thin mt-2 w-4/5 text-center">
                    {" "}
                    Tarea creada el:{" "}
                    {task.createdAt
                        ? task.createdAt
                              .toLocaleString()
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")
                        : null}
                </p>
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>
        </div>
    );
};

export default Detail;
