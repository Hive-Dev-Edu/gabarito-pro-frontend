export interface LoginRequisicao { 
    email: string;
    password: string;
}

export interface LoginResposta { 
    user: {
        id: string;
        name: string;
        email: string;
    };
    accessToken: string;
}