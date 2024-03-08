import { useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks";
import { Task } from "../interfaces/Task.interface";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTasksRequest()
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <div className="border-gray-600 border-t-2 mt-2">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
