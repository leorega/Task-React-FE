import { useTasks } from "../context/useTasks";
import { Task } from "../interfaces/Task.interface";
import { IoCheckmarkDoneSharp, IoTrashSharp } from "react-icons/io5";

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const { deleteTask, updateTask } = useTasks();

    return (
        <div
            key={task._id}
            className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer"
        >
            <div>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                {task.done ? (
                    <IoCheckmarkDoneSharp
                        className="text-green-600 h-8 w-8"
                        onClick={() => {
                            updateTask(task._id, {
                                done: !task.done,
                            });
                        }}
                    />
                ) : (
                    <IoCheckmarkDoneSharp
                        className="text-gray-400 h-6 w-6"
                        onClick={() => {
                            updateTask(task._id, {
                                done: !task.done,
                            });
                        }}
                    />
                )}
                <IoTrashSharp
                    className="h-6 w-6 text-red-600"
                    onClick={async () => {
                        if (
                            !window.confirm(
                                "Are you sure you want delete this task?"
                            )
                        )
                            return;
                        await deleteTask(task._id);
                    }}
                />
            </div>
        </div>
    );
};

export default TaskItem;
