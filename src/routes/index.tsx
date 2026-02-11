import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import VerificarToken from "../pages/VerificarToken/VerificarToken";
import TesteAposLogin from "../pages/TesteApósLogin/TesteApósLogin";
import EsqueceuSenha from "../pages/EsqueceuSenha/EsqueceuSenha";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/verify" element={<VerificarToken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teste-apos-login" element={<TesteAposLogin />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/reset-password" element={<RedefinirSenha />} />
        </Routes>
    )
    
}