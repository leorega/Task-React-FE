import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const { user } = useAuth0();

    return (
        <div className="h-12 flex justify-around items-center">
            <img
                className="h-full rounded-full"
                src={user?.picture}
                alt={user?.name}
            />
            <h1 className="text-3xl font-bold text-center block my2">
                <span className="text-indigo-500">Task</span>
                {Array.from(" Viewer").map((char, index) => {
                    const colors = [
                        "text-red-500",
                        "text-green-500",
                        "text-yellow-300",
                    ];
                    return (
                        <span
                            key={index}
                            className={colors[index % colors.length]}
                        >
                            {char}
                        </span>
                    );
                })}
            </h1>
            <LogoutButton />
        </div>
    );
};

export default Header;
