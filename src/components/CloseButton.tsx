interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return (
        <button
            className="border-2 border-indigo-500 text-indigo-500 hover:text-white hover:text-xl duration-500 rounded-md w-8 h-8 font-bold absolute top-2 right-2"
            onClick={onClick}
        >
            X
        </button>
    );
};

export default CloseButton;
