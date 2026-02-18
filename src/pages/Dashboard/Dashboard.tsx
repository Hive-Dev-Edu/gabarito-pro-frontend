import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardService, type Usuario } from "./services/dashboard.service";
import IconeCarregamento from "../../shared/components/IconeCarregamento";
import { LogOut, BookOpen, PlusCircle, User } from "lucide-react";

const dashboardService = new DashboardService();

export default function Dashboard() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await dashboardService.obterUsuarioLogado();
                setUsuario(dados);
            } catch {
                // Se falhou (401 etc.), o interceptor já removeu o token
                navigate("/login", { replace: true });
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("accessToken");
        navigate("/login", { replace: true });
    }

    if (carregando) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <IconeCarregamento w={32} h={32} color="black" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo-gabarito-pro.png"
                            alt="Logo Gabarito Pro"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold text-xl text-gray-800">
                            Gabarito.pro
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <User size={18} />
                            <span className="text-sm font-medium">
                                {usuario?.name}
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-300 cursor-pointer"
                        >
                            <LogOut size={16} />
                            Sair
                        </button>
                    </div>
                </div>
            </header>

            {/* Conteúdo */}
            <div className="max-w-5xl mx-auto px-4 py-10">
                {/* Saudação */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Olá, {usuario?.name?.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Bem-vindo ao Gabarito Pro. O que deseja fazer hoje?
                    </p>
                </div>

                {/* Cards de ação */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Questões */}
                    <Link
                        to="/questoes"
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                            <BookOpen size={24} className="text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Explorar Questões
                        </h2>
                        <p className="text-sm text-gray-500">
                            Navegue por questões públicas com filtros por
                            matéria, ano e dificuldade.
                        </p>
                    </Link>

                    {/* Criar questão */}
                    <Link
                        to="/questoes/criar"
                        className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    >
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                            <PlusCircle size={24} className="text-teal-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Criar Questão
                        </h2>
                        <p className="text-sm text-gray-500">
                            Crie uma nova questão com 5 alternativas e
                            compartilhe com a comunidade.
                        </p>
                    </Link>
                </div>

                {/* Info do usuário */}
                <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Seus dados
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Nome</span>
                            <p className="font-medium text-gray-800">
                                {usuario?.name}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-400">Email</span>
                            <p className="font-medium text-gray-800">
                                {usuario?.email}
                            </p>
                        </div>
                        <div>
                            <span className="text-gray-400">Perfil</span>
                            <p className="font-medium text-gray-800">
                                {usuario?.role === "student"
                                    ? "Estudante"
                                    : "Responsável"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
