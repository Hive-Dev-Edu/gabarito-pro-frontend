import { httpClient } from "../../../utils/httpClient";

export class VerificarTokenService { 
    async verificarToken(token: string): Promise<boolean> { 

        try {
            
            const response = await httpClient.get(`/auth/verify-email/${token}`);
            localStorage.setItem("authToken", response.data.token);
            
            return response.data.message;
            
        } catch (error) {
            console.error("Erro ao verificar token: ", error);
            return false;
        }
    }
}