import { httpClient } from "../../../utils/httpClient";
import type { EsqueceuSenhaResposta } from "../types/esqueceuSenha.types";

export class EsqueceuSenhaService {
    async enviarEmailRecuperacao(email: string): Promise<EsqueceuSenhaResposta> {
        try {
            const response = await httpClient.post("/auth/forgot-password", {
                email,
            });

            return response.data;
        } catch (error) {
            console.error("Erro ao enviar email de recuperação: ", error);
            throw new Error("Erro ao enviar email de recuperação");
        }
    }
}