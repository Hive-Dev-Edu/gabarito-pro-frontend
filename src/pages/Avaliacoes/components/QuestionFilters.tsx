import type {
  QuestionDifficulty,
  QuestionFiltersState,
} from "../types/assessments.types";

interface QuestionFiltersProps {
  filters: QuestionFiltersState;
  onChange: <K extends keyof QuestionFiltersState>(
    field: K,
    value: QuestionFiltersState[K]
  ) => void;
  onClear: () => void;
}

export default function QuestionFilters({
  filters,
  onChange,
  onClear,
}: QuestionFiltersProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tema / conteúdo
          </label>
          <input
            type="text"
            value={filters.schoolYear}
            onChange={(e) => onChange("schoolYear", e.target.value)}
            placeholder="Ex: Álgebra Linear"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matéria
          </label>
          <input
            type="text"
            value={filters.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            placeholder="Ex: Matemática"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dificuldade
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              onChange("difficulty", e.target.value as QuestionDifficulty | "")
            }
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6] bg-white"
          >
            <option value="">Todas</option>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 h-12">
            <input
              type="checkbox"
              checked={filters.myQuestionsOnly}
              onChange={(e) => onChange("myQuestionsOnly", e.target.checked)}
              className="h-4 w-4 accent-[#2EC5B6]"
            />
            Somente minhas questões
          </label>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onClear}
            className="w-full p-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </div>
  );
}