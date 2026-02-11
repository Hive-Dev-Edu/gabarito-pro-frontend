import { httpClient } from "../../../utils/httpClient";

interface RedefinirSenhaRequest {
    token: string;
    newPassword: string;
}

interface RedefinirSenhaResponse {
    success: boolean;
    message: string;
}

export class RedefinirSenhaService {
    async redefinirSenha({
        token,
        newPassword,
    }: RedefinirSenhaRequest): Promise<RedefinirSenhaResponse> {
        try {
            const response = await httpClient.post(
                `/auth/reset-password/${token}`,
                { newPassword }
            );

            return {
                success: true,
                message: response.data.message || "Senha redefinida com sucesso!",
            };
        } catch (error) {
            console.error("Erro ao redefinir senha:", error);

            return {
                success: false,
                message: "Não foi possível redefinir a senha. Tente novamente.",
            };
        }
    }
}
