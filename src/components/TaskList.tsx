import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";

const TaskList = () => {
    const { tasks } = useTasks();

    return (
        <div className="border-gray-600 border-t-2 mt-2">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
