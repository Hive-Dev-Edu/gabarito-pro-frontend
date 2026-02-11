import type {
    CadastroResponse,
    CadastroUsuario,
} from "../types/cadastro.types";
import { httpClient } from "../../../utils/httpClient";
import axios from "axios";

interface ReenviarTokenResposta { 
    message: string;
}

interface CadastroGoogleRequest {
    code: string;
}

export class CadastroService {
    async cadastrarUsuario(
        dadosUsuario: CadastroUsuario,
    ): Promise<CadastroResponse> {
        try {

            const response = await httpClient.post(
                `/auth/register`,
                dadosUsuario,
            );

            return response.data;
        } catch (error) {

            if (axios.isAxiosError(error)) {

                if (error.response?.status === 400) {
                    throw new Error("Esse email já está associado a uma conta.");
                }

                throw new Error("Erro ao cadastrar usuário");
            } else { 
                throw new Error("Erro desconhecido ao cadastrar usuário");
            }
            
        }
    }

    async cadastrarComGoogle(
        dadosGoogle: CadastroGoogleRequest,
    ): Promise<CadastroResponse> {
        try {
            const response = await httpClient.post(
                "/auth/google-login",
                dadosGoogle,
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("Erro ao cadastrar com Google");
            }
            throw new Error("Erro desconhecido ao cadastrar com Google");
        }
    }
    
    async reenviarTokenEmailVerificacao(email: string): Promise<ReenviarTokenResposta> {
        try {
            const response = await httpClient.post("/auth/resend-verification-email", {
                email,
            });

            return response.data;
        } catch (error) {
            console.error("Erro ao reenviar email de verificação: ", error);
            throw new Error("Erro ao reenviar email de verificação");
        }
    }
}
