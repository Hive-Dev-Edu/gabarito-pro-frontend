import { Loader2, X } from "lucide-react";
import type { AssessmentDraft } from "../types/assessments.types";

interface AssessmentPreviewModalProps {
  open: boolean;
  draft: AssessmentDraft | null;
  onClose: () => void;
  onSaveDraft: () => void;
  onCreate: () => void;
  savingDraft?: boolean;
  creating?: boolean;
}

export default function AssessmentPreviewModal({
  open,
  draft,
  onClose,
  onSaveDraft,
  onCreate,
  savingDraft = false,
  creating = false,
}: AssessmentPreviewModalProps) {
  if (!open || !draft) return null;

  const orderedQuestions = [...(draft.selectedQuestions ?? [])].sort(
    (a, b) => a.order - b.order
  );

  const totalWeight = orderedQuestions.reduce(
    (acc, item) => acc + Number(item.weight || 0),
    0
  );

  const isBusy = savingDraft || creating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6">
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
              Preview da Avaliação
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Confira a estrutura da prova antes de salvar ou criar.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Fechar preview"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4 sm:px-6 sm:py-6">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {draft.title || "Avaliação sem título"}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Visualização da prova antes da finalização.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <span className="font-semibold text-slate-700">Turma:</span>{" "}
                    {draft.className || "Não informada"}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">Data:</span>{" "}
                    {draft.applicationDate || "Não informada"}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">
                      Questões:
                    </span>{" "}
                    {orderedQuestions.length}
                  </div>

                  <div>
                    <span className="font-semibold text-slate-700">
                      Peso total:
                    </span>{" "}
                    {totalWeight}
                  </div>
                </div>
              </div>

              {draft.description && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    {draft.description}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
              <div className="rounded-2xl border border-dashed border-slate-300 p-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Nome do aluno
                    </span>
                    <div className="mt-4 h-6 border-b border-slate-300" />
                  </div>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Nota
                    </span>
                    <div className="mt-4 h-6 border-b border-slate-300" />
                  </div>
                </div>
              </div>

              {orderedQuestions.length === 0 ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                  Nenhuma questão selecionada para esta avaliação.
                </div>
              ) : (
                orderedQuestions.map((question, index) => (
                  <div
                    key={question.questionId}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <h4 className="text-base font-semibold text-slate-800">
                        Questão {index + 1}
                      </h4>

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

                    {question.alternatives &&
                      question.alternatives.length > 0 && (
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
                ))
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isBusy}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {savingDraft ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando rascunho...
                </>
              ) : (
                "Salvar rascunho"
              )}
            </button>

            <button
              type="button"
              onClick={onCreate}
              disabled={isBusy}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2EC5B6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#27b3a6] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Criando avaliação...
                </>
              ) : (
                "Criar avaliação"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}