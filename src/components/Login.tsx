import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowCircleDown } from "react-icons/fa";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center block underline text-yellow-300 underline-offset-4">
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

            <FaArrowCircleDown className="my-4 text-3xl animate-pulse text-indigo-500" />
            <button
                className="bg-indigo-800 text-white px-3 block py-2 w-full rounded-md hover:bg-indigo-500 hover:text-black duration-500"
                onClick={() => loginWithRedirect()}
            >
                Ingresar
            </button>
        </div>
    );
};

export default LoginButton;
