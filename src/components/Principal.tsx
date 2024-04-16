import { TaskProvider } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";

const Principal = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="bg-gray-950 p-4 w-full md:w-2/5">
                <Header />
                <TaskProvider>
                    <TaskForm />
                    <TaskList />
                </TaskProvider>
            </div>
        )
    );
};

export default Principal;
