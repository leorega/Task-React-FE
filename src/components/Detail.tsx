import { Task } from "../interfaces/Task.interface";

interface Props {
    task: Task;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = ({ task, setIsOpen }: Props) => {
    return (
        <div className="bg-black bg-opacity-80 fixed top-0 left-0 h-full w-full z-50 flex items-center justify-center">
            <div
                className={`bg-gray-950 rounded-sm border-2 ${
                    task.done ? "border-green-500" : "border-red-500"
                } border-indigo-500 px-4 flex flex-col items-center w-4/5 md:w-2/5`}
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
                <p className="text-sm font-thin mt-2 w-4/5 text-center">
                    {" "}
                    Tarea creada el:{" "}
                    {task.createdAt
                        ? task.createdAt.toLocaleString().slice(0, 10)
                        : null}
                </p>
                <button
                    className="bg-indigo-500 block w-3/5 h-10 hover:border-2 my-4 box-border"
                    onClick={() => setIsOpen(false)}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default Detail;
