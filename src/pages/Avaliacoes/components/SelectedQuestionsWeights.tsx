import type { QuestionItem } from "../types/assessments.types";

interface SelectedQuestionWeightItem {
  question: QuestionItem;
  weight: number;
}

interface SelectedQuestionsWeightsProps {
  items: SelectedQuestionWeightItem[];
  onWeightChange: (questionId: string, value: number) => void;
  onRemove: (questionId: string) => void;
  totalScore: number;
}

export default function SelectedQuestionsWeights({
  items,
  onWeightChange,
  onRemove,
  totalScore,
}: SelectedQuestionsWeightsProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm mb-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Definição de pesos
        </h2>

        <span className="text-sm text-gray-500">
          Total da avaliação:{" "}
          <span className="font-semibold text-gray-800">{totalScore}</span>
        </span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          Selecione ao menos uma questão para definir os pesos.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(({ question, weight }) => (
            <div
              key={question.id}
              className="border border-gray-200 rounded-2xl p-4 sm:p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
                <div className="flex-1">
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
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Peso
                    </label>
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={weight}
                      onChange={(e) =>
                        onWeightChange(question.id, Number(e.target.value))
                      }
                      className="w-28 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemove(question.id)}
                    className="mt-6 text-sm text-red-600 hover:text-red-700 underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}