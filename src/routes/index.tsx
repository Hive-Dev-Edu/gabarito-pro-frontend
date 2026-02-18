import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import VerificarToken from "../pages/VerificarToken/VerificarToken";
import EsqueceuSenha from "../pages/EsqueceuSenha/EsqueceuSenha";
import RedefinirSenha from "../pages/RedefinirSenha/RedefinirSenha";
import Dashboard from "../pages/Dashboard/Dashboard";
import ListagemQuestoes from "../pages/Questoes/ListagemQuestoes";
import DetalheQuestao from "../pages/Questoes/DetalheQuestao";
import CriarQuestao from "../pages/Questoes/CriarQuestao";
import EditarQuestao from "../pages/Questoes/EditarQuestao";
import RotaProtegida from "../shared/components/RotaProtegida";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rotas públicas */}
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/verify" element={<VerificarToken />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
            <Route path="/reset-password" element={<RedefinirSenha />} />

            {/* Rotas protegidas */}
            <Route
                path="/dashboard"
                element={
                    <RotaProtegida>
                        <Dashboard />
                    </RotaProtegida>
                }
            />
            <Route
                path="/questoes"
                element={
                    <RotaProtegida>
                        <ListagemQuestoes />
                    </RotaProtegida>
                }
            />
            <Route
                path="/questoes/criar"
                element={
                    <RotaProtegida>
                        <CriarQuestao />
                    </RotaProtegida>
                }
            />
            <Route
                path="/questoes/:id"
                element={
                    <RotaProtegida>
                        <DetalheQuestao />
                    </RotaProtegida>
                }
            />
            <Route
                path="/questoes/:id/editar"
                element={
                    <RotaProtegida>
                        <EditarQuestao />
                    </RotaProtegida>
                }
            />
        </Routes>
    );
}
