import { httpClient } from "../../../utils/httpClient";
import type { LoginRequisicao, LoginResposta } from "../types/login.types";
import axios from "axios";

interface LoginGoogleRequest {
    code: string;
}

export class LoginService {

    async login(body: LoginRequisicao): Promise<LoginResposta | false> {
        try {
            const response = await httpClient.post("/auth/login", body);
            localStorage.setItem("accessToken", response.data.accessToken);
            return response.data;
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
            return false;
        }
    }

    async loginComGoogle(
        dadosGoogle: LoginGoogleRequest,
    ): Promise<LoginResposta> {
        try {
            const response = await httpClient.post(
                "/auth/google-login",
                dadosGoogle,
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error("Erro ao fazer login com Google");
            }
            throw new Error("Erro desconhecido ao fazer login com Google");
        }
    }
}
