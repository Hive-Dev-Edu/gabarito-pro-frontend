import { ChevronLeft, ChevronRight } from "lucide-react";
import type { QuestionItem } from "../types/assessments.types";

const DIFFICULTY_LABEL = {
  easy: "Fácil",
  medium: "Médio",
  hard: "Difícil",
};

const DIFFICULTY_COLOR = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

interface QuestionsSelectorProps {
  questions: QuestionItem[];
  selectedIds: string[];
  loading: boolean;
  error: string;
  page: number;
  totalPages: number;
  total: number;
  onToggle: (question: QuestionItem) => void;
  onRetry: () => void;
  onChangePage: (page: number) => void;
}

export default function QuestionsSelector({
  questions,
  selectedIds,
  loading,
  error,
  page,
  totalPages,
  total,
  onToggle,
  onRetry,
  onChangePage,
}: QuestionsSelectorProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm mb-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Seleção de questões
        </h2>

        <span className="text-sm text-gray-500">
          {total} questão(ões) encontrada(s)
        </span>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Carregando questões...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-300 text-red-700 p-6 rounded-2xl text-center">
          <p>{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 text-sm underline cursor-pointer"
          >
            Tentar novamente
          </button>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          Nenhuma questão encontrada com os filtros atuais.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {questions.map((question) => {
              const isSelected = selectedIds.includes(question.id);

              return (
                <label
                  key={question.id}
                  className={`block border rounded-2xl p-4 sm:p-5 transition cursor-pointer ${
                    isSelected
                      ? "border-[#2EC5B6] bg-[#2EC5B6]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(question)}
                      className="mt-1 h-4 w-4 accent-[#2EC5B6]"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium line-clamp-2">
                        {question.statement}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                          {question.subject}
                        </span>

                        <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                          {question.schoolYear}
                        </span>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            DIFFICULTY_COLOR[question.difficulty]
                          }`}
                        >
                          {DIFFICULTY_LABEL[question.difficulty]}
                        </span>

                        <span className="text-xs text-gray-400">
                          {question.content}
                        </span>

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            question.isPublic
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {question.isPublic ? "Pública" : "Privada"}
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => onChangePage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm text-gray-600">
                Página <span className="font-semibold">{page}</span> de{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>

              <button
                onClick={() => onChangePage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}