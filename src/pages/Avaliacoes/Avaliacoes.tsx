import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import assessmentsService from "./services/assessments.service";
import type { Assessment } from "./types/assessments.types";
import IconeCarregamento from "../../shared/components/IconeCarregamento";
import AssessmentCard from "./components/AssessmentCard";

export default function AvaliacaoPage() {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const [page, setPage] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarAvaliacoes(currentPage = 1) {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await assessmentsService.getAssessments({
        page: currentPage,
        limit: 10,
      });

      setAssessments(resposta.data);
      setMeta(resposta.meta);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar avaliações. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarAvaliacoes(page);
  }, [page]);

  return (
    <main>
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
              title="Voltar"
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Avaliações
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mt-0.5 sm:mt-1">
                Gerencie e crie suas avaliações
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/avaliacoes/criar")}
            className="inline-flex items-center justify-center gap-2 bg-[#2EC5B6] hover:bg-[#27b3a6] text-white px-5 py-3 rounded-2xl font-semibold transition-colors duration-300 cursor-pointer"
          >
            <Plus size={20} />
            Nova Avaliação
          </button>
        </div>

        {carregando ? (
          <div className="flex justify-center items-center py-20">
            <IconeCarregamento w={32} h={32} color="black" />
          </div>
        ) : erro ? (
          <div className="bg-red-50 border border-red-300 text-red-700 p-6 rounded-2xl text-center">
            <p>{erro}</p>
            <button
              onClick={() => carregarAvaliacoes(page)}
              className="mt-3 text-sm underline cursor-pointer"
            >
              Tentar novamente
            </button>
          </div>
        ) : assessments.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Você ainda não possui avaliações cadastradas.</p>
            <p className="text-sm mt-1">
              Clique em "Nova Avaliação" para criar sua primeira avaliação.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-sm text-gray-600">
                  Página <span className="font-semibold">{meta.page}</span> de{" "}
                  <span className="font-semibold">{meta.totalPages}</span>{" "}
                  <span className="text-gray-400">
                    ({meta.total} avaliações)
                  </span>
                </span>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages, p + 1))
                  }
                  disabled={page >= meta.totalPages}
                  className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}