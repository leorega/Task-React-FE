import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";
import { ChangeEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const TaskList = () => {
    const { tasks, getTasksByPriority } = useTasks();

    const { user } = useAuth0();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (user) {
            const { name } = user;
            if (name) {
                getTasksByPriority(name, e.target.value);
            }
        }
    };

    return (
        <div className="border-gray-600 border-t-2 mt-2">
            <div className="flex justify-between gap-2 p-2 items-center">
                <h2 className="font-bold text-2xl text-center">
                    Lista de tareas
                </h2>
                <div className="grid xs:flex justify-between gap-1">
                    <div className="mb-2 xs:mb-0">
                        <input
                            hidden={true}
                            id="allTasks"
                            className="mr-2 peer"
                            type="radio"
                            name="priority"
                            value="todas"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="allTasks"
                            className="flex items-center border-2 px-1 rounded-md cursor-pointer peer-checked:bg-white peer-checked:text-black"
                        >
                            Todas
                        </label>
                    </div>
                    <div className="mb-2 xs:mb-0">
                        <input
                            hidden={true}
                            id="prioridad-importante"
                            className="mr-2 peer"
                            type="radio"
                            name="priority"
                            value="importante"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="prioridad-importante"
                            className="flex items-center border-2 border-red-500 px-1 rounded-md text-red-500 cursor-pointer peer-checked:bg-red-500 peer-checked:text-white"
                        >
                            Importante
                        </label>
                    </div>
                    <div className="mb-2 xs:mb-0">
                        <input
                            hidden={true}
                            id="prioridad-normal"
                            type="radio"
                            name="priority"
                            value="normal"
                            className="mr-2 peer"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="prioridad-normal"
                            className="flex items-center border-2 border-yellow-300 px-1 rounded-md text-yellow-300 cursor-pointer peer-checked:bg-yellow-300 peer-checked:text-black"
                        >
                            Normal
                        </label>
                    </div>
                    <div className="">
                        <input
                            hidden={true}
                            id="prioridad-tranqui"
                            type="radio"
                            name="priority"
                            value="tranqui"
                            className="mr-2 peer"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="prioridad-tranqui"
                            className="flex items-center border-2 border-green-500 px-1 rounded-md text-green-500 cursor-pointer peer-checked:bg-green-500 peer-checked:text-white"
                        >
                            Tranqui
                        </label>
                    </div>
                </div>
            </div>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
