import { useEffect, useState } from "react";
import {
  CalendarDays,
  Eye,
  FileText,
  GraduationCap,
  Trophy,
} from "lucide-react";
import type { Avaliacao } from "../types/avaliacao.types";
import AvaliacoesService from "../services/avaliacoes.service";

interface Props {
  avaliacao: Avaliacao;
  onPreview: (id: string) => void;
}

export default function CardAvaliacao({ avaliacao, onPreview }: Props) {
  const dataFormatada = avaliacao.date
    ? new Date(avaliacao.date).toLocaleDateString("pt-BR")
    : "Sem data";

  const [questionsCount, setQuestionsCount] = useState<number | undefined>(
    avaliacao.questions?.length ?? avaliacao.questionsCount
  );

  const [classNameState, setClassNameState] = useState<string | undefined>(
    avaliacao.className
  );

  const [totalScoreState, setTotalScoreState] = useState<number | undefined>(
    typeof avaliacao.totalScore === "number"
      ? Number(avaliacao.totalScore)
      : Number(avaliacao.totalScore ?? 0)
  );
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  useEffect(() => {
    let mounted = true;

    async function fetchDetailsIfNeeded() {
      const needsQuestions =
        typeof questionsCount !== "number" || questionsCount === 0;

      const needsClassName = !classNameState || !classNameState.trim();

      if (!needsQuestions && !needsClassName && totalScoreState !== undefined) {
        return;
      }

      try {
        setLoadingDetails(true);
        const full = await AvaliacoesService.getById(avaliacao.id);
        if (!mounted) return;
        setQuestionsCount(full.questions?.length ?? full.questionsCount ?? 0);
        setClassNameState(full.className ?? "");
        setTotalScoreState(Number(full.totalScore ?? 0));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.debug("[DEBUG] erro ao buscar avaliação por id", err);
      } finally {
        if (mounted) setLoadingDetails(false);
      }
    }

    fetchDetailsIfNeeded();

    return () => {
      mounted = false;
    };
  }, [avaliacao.id]);

  return (
    <div className="rounded-3xl border border-[#DDEDEA] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 inline-flex items-center rounded-full border border-[#BDEAE4] bg-[#F4FFFD] px-3 py-1 text-xs font-semibold text-[#14877B]">
            Publicada
          </div>

          <h3 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
            {avaliacao.title || "Avaliação sem título"}
          </h3>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
              <CalendarDays size={15} />
              {loadingDetails ? (
                <span className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
              ) : (
                dataFormatada
              )}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
              <GraduationCap size={15} />
              {loadingDetails ? (
                <span className="h-4 w-36 rounded bg-slate-200 animate-pulse" />
              ) : classNameState && classNameState.trim() ? (
                classNameState
              ) : (
                "Turma não informada"
              )}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5">
              <FileText size={15} />
              {loadingDetails ? (
                <span className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
              ) : (
                `${questionsCount ?? avaliacao.questions?.length ?? avaliacao.questionsCount ?? 0} questões`
              )}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF9EC] px-3 py-1.5 text-[#9A6A00]">
              <Trophy size={15} />
              {loadingDetails ? (
                <span className="h-4 w-24 rounded bg-amber-200 animate-pulse" />
              ) : (
                `Total: ${Number(totalScoreState ?? avaliacao.totalScore ?? 0).toFixed(2)}`
              )}
            </span>
          </div>
        </div>

        <button
          onClick={() => onPreview(avaliacao.id)}
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#D9E7E4] bg-white text-slate-600 transition hover:bg-[#F4FFFD] hover:text-[#14877B]"
          title="Visualizar prévia"
        >
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
}