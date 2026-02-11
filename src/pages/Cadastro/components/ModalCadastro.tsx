import { useState } from "react";
import { CadastroService } from "../services/cadastro.service";

interface ModalCadastroProps {
    message: string;
    onClose: () => void;
    email: string;
}

const cadastroService = new CadastroService();

export default function ModalCadastro({
    message,
    onClose,
    email,
}: ModalCadastroProps) {

    const [localMessage, setLocalMessage] = useState<string>(message);
    const [jaClicou, setJaClicou] = useState<boolean>(false);

    async function handleReenviarTokenEmailVerificacao() {
        try {
            setJaClicou(true);

            await cadastroService.reenviarTokenEmailVerificacao(email);

            setLocalMessage("Email de verificação reenviado com sucesso.");
        } catch (error) {
            console.error(error);
            alert("Erro ao reenviar email de verificação.");
        }
    }

    return (
        <main
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white max-w-md w-full p-8 rounded-2xl text-center"
            >
                <h2 className="text-2xl font-semibold">Cadastro</h2>

                <p className="my-4">{jaClicou ? localMessage : message}</p>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-[#2EC5B6] text-white rounded-xl cursor-pointer hover:bg-teal-600 transition-colors duration-300"
                    >
                        Fechar
                    </button>

                    <button
                        onClick={handleReenviarTokenEmailVerificacao}
                        className="w-full py-3 border border-teal-600 rounded-xl cursor-pointer hover:bg-teal-50 transition-colors duration-300"
                    >
                        Reenviar email
                    </button>
                </div>
            </div>
        </main>
    );
}
