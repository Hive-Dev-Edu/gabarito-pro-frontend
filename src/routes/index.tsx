import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import VerificarToken from "../pages/VerificarToken/VerificarToken";
import TesteAposLogin from "../pages/TesteApósLogin/TesteApósLogin";
import EsqueceuSenha from "../pages/EsqueceuSenha/EsqueceuSenha";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import ListagemQuestoes from "../pages/Questoes/ListagemQuestoes";
import DetalheQuestao from "../pages/Questoes/DetalheQuestao";
import CriarQuestao from "../pages/Questoes/CriarQuestao";
import EditarQuestao from "../pages/Questoes/EditarQuestao";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/verify" element={<VerificarToken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teste-apos-login" element={<TesteAposLogin />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/reset-password" element={<RedefinirSenha />} />

            {/* Questões */}
            <Route path="/questoes" element={<ListagemQuestoes />} />
            <Route path="/questoes/criar" element={<CriarQuestao />} />
            <Route path="/questoes/:id" element={<DetalheQuestao />} />
            <Route path="/questoes/:id/editar" element={<EditarQuestao />} />
        </Routes>
    );
}
