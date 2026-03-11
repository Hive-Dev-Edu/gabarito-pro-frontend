import { Trash2 } from "lucide-react";
import type { Questao } from "../../Questoes/types/questoes.types";

interface QuestaoSelecionadaLocal {
  questionId: string;
  weight: number;
  position: number;
  statement?: string;
  content?: string;
  subject?: string;
  schoolYear?: string;
  difficulty?: string;
  alternatives?: Array<{ id: string; text: string }>;
  question?: Questao;
}

interface Props {
  questao: QuestaoSelecionadaLocal;
  atualizarPeso: (id: string, peso: number) => void;
  remover: (id: string) => void;
}

function traduzirDificuldade(dificuldade?: string) {
  if (dificuldade === "easy") return "Fácil";
  if (dificuldade === "medium") return "Média";
  if (dificuldade === "hard") return "Difícil";
  return "Não informada";
}

function getStatement(questao: QuestaoSelecionadaLocal) {
  return questao.statement || questao.question?.statement || "";
}

function getSubject(questao: QuestaoSelecionadaLocal) {
  return questao.subject || questao.question?.subject || "";
}

function getDifficulty(questao: QuestaoSelecionadaLocal) {
  return questao.difficulty || questao.question?.difficulty || "";
}

export default function ItemQuestaoSelecionada({
  questao,
  atualizarPeso,
  remover,
}: Props) {
  return (
    <div className="rounded-3xl border border-[#DDEDEA] bg-white p-4 transition-all hover:border-[#B8EEE8] hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0FDFA] text-sm font-bold text-[#0F766E]">
            {questao.position}
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-slate-800 sm:text-base">
              {getStatement(questao) || "Enunciado não disponível"}
            </h4>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {getSubject(questao) || "Sem matéria"}
              </span>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {traduzirDificuldade(getDifficulty(questao))}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => remover(questao.questionId)}
          className="shrink-0 rounded-2xl p-2 text-red-500 transition-colors hover:bg-red-50"
          title="Remover questão"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-sm font-medium text-slate-600">
          Peso da questão
        </span>

        <input
          type="number"
          min={0.1}
          step={0.1}
          value={questao.weight}
          onChange={(e) =>
            atualizarPeso(questao.questionId, Number(e.target.value))
          }
          className="w-28 rounded-2xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
        />
      </div>
    </div>
  );
}