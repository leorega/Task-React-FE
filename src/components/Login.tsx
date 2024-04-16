import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowCircleDown } from "react-icons/fa";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center block underline underline-offset-4">
                Tasks Viewer
            </h1>
            <FaArrowCircleDown className="my-4 text-3xl animate-pulse" />
            <button
                className="bg-indigo-300 text-black px-3 block py-2 w-full hover:bg-indigo-500 hover:text-white duration-500"
                onClick={() => loginWithRedirect()}
            >
                Ingresar
            </button>
        </div>
    );
};

export default LoginButton;
