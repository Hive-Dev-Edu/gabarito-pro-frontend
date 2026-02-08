import { httpClient } from "../../../utils/httpClient";

export class TesteAposLoginService { 
    async obterUsuarioLogado() {
        try {
            const response = await httpClient.get("/users/me");
            console.log(response.data);
            
            return response.data;   
        } catch (error) {
            console.error("Erro ao obter usuário logado: ", error);
            throw new Error("Erro ao obter usuário logado");
        }
    }
}