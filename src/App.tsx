import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/Login";
import Principal from "./components/Principal";

const App = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="bg-zinc-900 min-h-screen text-white flex flex-col items-center justify-center">
            {isAuthenticated ? <Principal /> : <LoginButton />}
        </div>
    );
};

export default App;
