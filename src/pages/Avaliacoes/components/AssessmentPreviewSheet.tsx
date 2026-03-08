import { AssessmentQuestionPreview } from './AssessmentQuestionPreview';
import type { AssessmentDraft } from '../types/assessments.types';

interface AssessmentPreviewSheetProps {
  draft: AssessmentDraft;
}

export function AssessmentPreviewSheet({
  draft,
}: AssessmentPreviewSheetProps) {
  const orderedQuestions = [...(draft.selectedQuestions || [])].sort(
    (a, b) => a.order - b.order
  );

  const totalWeight = orderedQuestions.reduce(
    (acc, question) => acc + Number(question.weight || 0),
    0
  );

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {draft.title || 'Avaliação sem título'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Confira abaixo como a avaliação será exibida antes de salvar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <span className="font-semibold text-slate-700">Turma:</span>{' '}
              {draft.className || 'Não informada'}
            </div>

            <div>
              <span className="font-semibold text-slate-700">Data:</span>{' '}
              {draft.applicationDate || 'Não informada'}
            </div>

            <div>
              <span className="font-semibold text-slate-700">Questões:</span>{' '}
              {orderedQuestions.length}
            </div>

            <div>
              <span className="font-semibold text-slate-700">
                Peso total:
              </span>{' '}
              {totalWeight}
            </div>
          </div>
        </div>

        {draft.description && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              {draft.description}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6 px-6 py-6">
        <div className="rounded-xl border border-dashed border-slate-300 p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-3">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nome do aluno
              </span>
              <div className="mt-4 h-6 border-b border-slate-300" />
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nota
              </span>
              <div className="mt-4 h-6 border-b border-slate-300" />
            </div>
          </div>
        </div>

        {orderedQuestions.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Nenhuma questão foi selecionada para esta avaliação.
          </div>
        ) : (
          orderedQuestions.map((question, index) => (
            <AssessmentQuestionPreview
              key={question.questionId}
              question={question}
              index={index + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}