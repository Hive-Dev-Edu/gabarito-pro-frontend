interface ModalRedefinirSenhaProps {
    message: string;
    onClose: () => void;
    navigateToLogin: () => void;
}

export default function ModalRedefinirSenha({
    message,
    onClose,
    navigateToLogin,
}: ModalRedefinirSenhaProps) {
    return (
        <main
            className="
        fixed inset-0 z-50 
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        animate-fadeIn
      "
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
          bg-white w-full max-w-md
          rounded-2xl p-8
          shadow-2xl
          flex flex-col gap-6
          text-center
          animate-scaleIn
        "
            >
                <h2 className="text-2xl font-semibold text-gray-800">
                    Recuperação de senha
                </h2>

                <p className="text-gray-600">{message}</p>

                <button
                    onClick={navigateToLogin}
                    className="
                        mt-2 w-full py-3
                        rounded-xl
                        bg-[#2EC5B6]
                        text-white font-medium
                        hover:brightness-110
                        transition
                        cursor-pointer
                    "
                >
                    Fechar
                </button>
            </div>
        </main>
    );
}
