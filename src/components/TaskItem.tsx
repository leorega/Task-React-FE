import { useTasks } from "../context/useTasks";
import { Task } from "../interfaces/Task.interface";
import { IoCheckmarkDoneSharp, IoTrashSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import Detail from "./Detail";
import { useState } from "react";

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const { deleteTask, updateTask } = useTasks();

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteFalse = () => {
        Swal.fire({
            background: "#27272a",
            toast: true,
            color: "white",
            title: "Tarea incompleta",
            text: "La tarea debe estar marcada como completa para poder eliminarla",
            confirmButtonText: "Ok",
        });
    };

    const handleDeleteTrue = () => {
        Swal.fire({
            background: "#27272a",
            toast: true,
            color: "white",
            title: "¿¡Querés eliminar esta tarea!?",
            icon: "warning",
            iconColor: "yellow",
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
            cancelButtonColor: "red",
        }).then((result) => {
            if (result.isConfirmed) {
                if (task._id) deleteTask(task._id);
            }
        });
    };

    const handleComplete = () => {
        Swal.fire({
            background: "#27272a",
            toast: true,
            icon: "success",
            iconColor: "rgb(22 163 74)",
            color: "white",
            title: "Tarea marcada como completa",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    const handlePending = () => {
        Swal.fire({
            background: "#27272a",
            toast: true,
            icon: "warning",
            iconColor: "yellow",
            color: "white",
            title: "Pasaste la tarea a pendiente",
            timer: 2000,
            showConfirmButton: false,
        });
    };

    return (
        <div
            key={task._id}
            className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800"
        >
            {isOpen && <Detail task={task} setIsOpen={setIsOpen} />}
            <div
                className="overflow-hidden mr-4 cursor-pointer min-w-[70%] md:min-w-[80%]"
                onClick={() => setIsOpen(true)}
            >
                <h2 className="text-xl text-yellow-300">{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className="flex items-center">
                <IoCheckmarkDoneSharp
                    className={`${
                        task.done
                            ? "text-green-600 h-8 w-8"
                            : "text-gray-400 h-6 w-6 mr-4"
                    } hover:cursor-pointer`}
                    onClick={() => {
                        if (task._id) {
                            updateTask(task._id, {
                                done: !task.done,
                            });
                        }
                        !task.done ? handleComplete() : handlePending();
                    }}
                />
                {task.done && (
                    <section className="flex">
                        <span className="mx-2">|</span>
                        <IoTrashSharp
                            className="h-6 w-6 text-red-600 hover:cursor-pointer"
                            onClick={async () => {
                                !task.done
                                    ? handleDeleteFalse()
                                    : handleDeleteTrue();
                            }}
                        />
                    </section>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
