import { useTasks } from "../context/useTasks";
import { Task } from "../interfaces/Task.interface";
import { IoCheckmarkDoneSharp, IoTrashSharp } from "react-icons/io5";
import Swal from "sweetalert2";

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const { deleteTask, updateTask } = useTasks();

    return (
        <div
            key={task._id}
            className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800"
        >
            <div>
                <h2 className="text-xl text-yellow-300">{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                {task.done ? (
                    <IoCheckmarkDoneSharp
                        className="text-green-600 h-8 w-8 hover:cursor-pointer"
                        onClick={() => {
                            if (task._id) {
                                updateTask(task._id, {
                                    done: !task.done,
                                });
                            }
                        }}
                    />
                ) : (
                    <IoCheckmarkDoneSharp
                        className="text-gray-400 h-6 w-6 hover:cursor-pointer"
                        onClick={() => {
                            if (task._id) {
                                updateTask(task._id, {
                                    done: !task.done,
                                });
                            }
                        }}
                    />
                )}
                <IoTrashSharp
                    className="h-6 w-6 text-red-600 hover:cursor-pointer"
                    onClick={async () => {
                        if (!task.done) {
                            Swal.fire({
                                background: "#27272a",
                                toast: true,
                                color: "white",
                                title: "Tarea incompleta",
                                text: "La tarea debe estar marcada como completa para poder eliminarla",
                                confirmButtonText: "Ok",
                            });
                        } else
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
                        return;
                    }}
                />
            </div>
        </div>
    );
};

export default TaskItem;
