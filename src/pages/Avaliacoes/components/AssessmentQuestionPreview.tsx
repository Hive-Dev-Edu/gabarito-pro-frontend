import type { SelectedAssessmentQuestion } from '../types/assessments.types';

interface AssessmentQuestionPreviewProps {
  question: SelectedAssessmentQuestion;
  index: number;
}

export function AssessmentQuestionPreview({
  question,
  index,
}: AssessmentQuestionPreviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-base font-semibold text-slate-800">
          Questão {index}
        </h3>

        <div className="flex flex-wrap gap-2">
          {question.subject && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {question.subject}
            </span>
          )}

          {question.difficulty && (
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              {question.difficulty}
            </span>
          )}

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            Peso: {question.weight}
          </span>
        </div>
      </div>

      <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
        {question.statement}
      </p>

      {question.alternatives && question.alternatives.length > 0 && (
        <div className="mt-5 space-y-3">
          {question.alternatives.map((alternative, altIndex) => {
            const letter = String.fromCharCode(65 + altIndex);

            return (
              <div
                key={alternative.id}
                className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                  {letter}
                </span>

                <p className="text-sm leading-6 text-slate-700">
                  {alternative.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}