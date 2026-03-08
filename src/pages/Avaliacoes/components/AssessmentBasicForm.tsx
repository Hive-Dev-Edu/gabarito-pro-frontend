import type { AssessmentFormData, ClassOption } from "../types/assessments.types";

interface AssessmentBasicFormProps {
  form: AssessmentFormData;
  classes: ClassOption[];
  errors: {
    title: string;
    date: string;
    classId: string;
  };
  onChange: (field: keyof AssessmentFormData, value: string) => void;
}

export default function AssessmentBasicForm({
  form,
  classes,
  errors,
  onChange,
}: AssessmentBasicFormProps) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Dados básicos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título da avaliação
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Ex: Prova de Matemática - 1º Bimestre"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Turma
          </label>
          <select
            value={form.classId}
            onChange={(e) => onChange("classId", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6] bg-white"
          >
            <option value="">Selecione uma turma</option>
            {classes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.gradeLevel ? `— ${item.gradeLevel}` : ""}
              </option>
            ))}
          </select>
          {errors.classId && (
            <p className="mt-2 text-sm text-red-500">{errors.classId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => onChange("date", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2EC5B6]"
          />
          {errors.date && (
            <p className="mt-2 text-sm text-red-500">{errors.date}</p>
          )}
        </div>
      </div>
    </div>
  );
}