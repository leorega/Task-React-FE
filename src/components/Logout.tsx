import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            className="border-2 py-1 px-4 hover:border-indigo-500 duration-500"
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Salir
        </button>
    );
};

export default LogoutButton;
