import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import assessmentsService from "./services/assessments.service";
import AssessmentBasicForm from "./components/AssessmentBasicForm";
import QuestionFilters from "./components/QuestionFilters";
import QuestionsSelector from "./components/QuestionsSelector";
import SelectedQuestionsWeights from "./components/SelectedQuestionsWeights";
import AssessmentPreviewModal from "./components/AssessmentPreviewModal";

import type {
  AssessmentDraft,
  AssessmentFormData,
  ClassOption,
  CreateAssessmentDTO,
  QuestionFiltersState,
  QuestionItem,
} from "./types/assessments.types";

interface SelectedQuestionState {
  question: QuestionItem;
  weight: number;
}

export default function CriarAvaliacoes() {
  const navigate = useNavigate();

  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState("");

  const [form, setForm] = useState<AssessmentFormData>({
    title: "",
    date: "",
    classId: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    date: "",
    classId: "",
  });

  const [questionFilters, setQuestionFilters] = useState<QuestionFiltersState>({
    subject: "",
    difficulty: "",
    schoolYear: "",
    myQuestionsOnly: false,
  });

  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [questionsMeta, setQuestionsMeta] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [questionsPage, setQuestionsPage] = useState(1);

  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questionsError, setQuestionsError] = useState("");

  const [selectedQuestions, setSelectedQuestions] = useState<
    SelectedQuestionState[]
  >([]);

  const [previewOpen, setPreviewOpen] = useState(false);

  const [savingDraft, setSavingDraft] = useState(false);
  const [creating, setCreating] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  const [feedbackError, setFeedbackError] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState("");

  async function loadClasses() {
    try {
      setClassesLoading(true);
      setClassesError("");

      const response = await assessmentsService.getClasses(1, 100);
      setClasses(response.data);
    } catch (error) {
      console.error(error);
      setClassesError("Não foi possível carregar as turmas.");
    } finally {
      setClassesLoading(false);
    }
  }

  async function loadQuestions(page = 1) {
    try {
      setQuestionsLoading(true);
      setQuestionsError("");

      const response = await assessmentsService.getQuestions(
        questionFilters,
        page,
        10
      );

      setQuestions(response.data);
      setQuestionsMeta(response.meta);
    } catch (error) {
      console.error(error);
      setQuestionsError("Erro ao carregar questões. Tente novamente.");
    } finally {
      setQuestionsLoading(false);
    }
  }

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    setQuestionsPage(1);
  }, [
    questionFilters.subject,
    questionFilters.schoolYear,
    questionFilters.difficulty,
    questionFilters.myQuestionsOnly,
  ]);

  useEffect(() => {
    loadQuestions(questionsPage);
  }, [
    questionsPage,
    questionFilters.subject,
    questionFilters.schoolYear,
    questionFilters.difficulty,
    questionFilters.myQuestionsOnly,
  ]);

  const totalScore = useMemo(() => {
    return selectedQuestions.reduce((acc, item) => acc + item.weight, 0);
  }, [selectedQuestions]);

  const selectedQuestionIds = useMemo(() => {
    return selectedQuestions.map((item) => item.question.id);
  }, [selectedQuestions]);

  const selectedClassName = useMemo(() => {
    const selectedClass = classes.find((item) => item.id === form.classId);
    return selectedClass?.name ?? "";
  }, [classes, form.classId]);

  const previewDraft = useMemo<AssessmentDraft>(() => {
    return {
      title: form.title.trim(),
      classId: form.classId,
      className: selectedClassName,
      applicationDate: form.date,
      description: "",
      selectedQuestions: selectedQuestions.map((item, index) => ({
        questionId: item.question.id,
        statement: item.question.statement ?? "",
        subject: item.question.subject ?? "",
        difficulty: item.question.difficulty ?? "",
        weight: item.weight,
        order: index + 1,
        alternatives: item.question.alternatives ?? [],
      })),
    };
  }, [form.title, form.classId, form.date, selectedClassName, selectedQuestions]);

  const isBusy = savingDraft || creating || previewLoading;
  const isInitialPageLoading = classesLoading && classes.length === 0;

  function handleFormChange(field: keyof AssessmentFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
    setFeedbackError("");
    setFeedbackSuccess("");
  }

  function handleFilterChange<K extends keyof QuestionFiltersState>(
    field: K,
    value: QuestionFiltersState[K]
  ) {
    setQuestionFilters((prev) => ({ ...prev, [field]: value }));
  }

  function clearQuestionFilters() {
    setQuestionFilters({
      subject: "",
      difficulty: "",
      schoolYear: "",
      myQuestionsOnly: false,
    });
    setQuestionsPage(1);
  }

  function toggleQuestionSelection(question: QuestionItem) {
    setFeedbackError("");
    setFeedbackSuccess("");

    setSelectedQuestions((prev) => {
      const exists = prev.some((item) => item.question.id === question.id);

      if (exists) {
        return prev.filter((item) => item.question.id !== question.id);
      }

      return [...prev, { question, weight: 1 }];
    });
  }

  function handleWeightChange(questionId: string, value: number) {
    setSelectedQuestions((prev) =>
      prev.map((item) =>
        item.question.id === questionId
          ? {
              ...item,
              weight: Number.isNaN(value) || value <= 0 ? 1 : value,
            }
          : item
      )
    );
  }

  function handleRemoveSelected(questionId: string) {
    setSelectedQuestions((prev) =>
      prev.filter((item) => item.question.id !== questionId)
    );
  }

  function validateForm(showQuestionError = true) {
    const errors = {
      title: "",
      date: "",
      classId: "",
    };

    let isValid = true;

    if (!form.title.trim()) {
      errors.title = "O título da avaliação é obrigatório.";
      isValid = false;
    }

    if (!form.classId) {
      errors.classId = "Selecione uma turma.";
      isValid = false;
    }

    if (!form.date) {
      errors.date = "Selecione a data da avaliação.";
      isValid = false;
    }

    setFormErrors(errors);

    if (selectedQuestions.length === 0) {
      if (showQuestionError) {
        setFeedbackError(
          "Selecione ao menos uma questão para montar a avaliação."
        );
      }
      isValid = false;
    }

    return isValid;
  }

  function buildPayload(status: "DRAFT" | "PUBLISHED"): CreateAssessmentDTO {
    return {
      title: form.title.trim(),
      date: `${form.date}T12:00:00`,
      classId: form.classId,
      totalScore,
      status,
      questions: selectedQuestions.map((item) => ({
        questionId: item.question.id,
        weight: item.weight,
      })),
    };
  }

  function handleOpenPreview() {
    setFeedbackError("");
    setFeedbackSuccess("");

    const isValid = validateForm(false);

    if (!isValid) {
      setFeedbackError(
        "Preencha os dados obrigatórios e selecione pelo menos uma questão para visualizar o preview."
      );
      return;
    }

    try {
      setPreviewLoading(true);
      setPreviewOpen(true);
    } finally {
      setPreviewLoading(false);
    }
  }

  async function handleSaveDraft() {
    setFeedbackError("");
    setFeedbackSuccess("");

    if (!validateForm()) return;

    try {
      setSavingDraft(true);

      const payload = buildPayload("DRAFT");
      await assessmentsService.createAssessment(payload);

      setFeedbackSuccess("Rascunho salvo com sucesso.");
      setPreviewOpen(false);

      setTimeout(() => navigate("/avaliacoes/rascunhos"), 1000);
    } catch (error) {
      console.error(error);
      setFeedbackError("Não foi possível salvar o rascunho.");
    } finally {
      setSavingDraft(false);
    }
  }

  async function handleCreateAssessment() {
    setFeedbackError("");
    setFeedbackSuccess("");

    if (!validateForm()) return;

    try {
      setCreating(true);

      const payload = buildPayload("PUBLISHED");
      await assessmentsService.createAssessment(payload);

      setFeedbackSuccess("Avaliação criada com sucesso.");
      setPreviewOpen(false);

      setTimeout(() => navigate("/avaliacoes"), 1000);
    } catch (error) {
      console.error(error);
      setFeedbackError("Não foi possível criar a avaliação.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <main>
      <div className="mx-auto max-w-5xl px-3 py-6 sm:px-4 sm:py-8">
        <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
          <button
            type="button"
            onClick={() => navigate("/avaliacoes")}
            className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-70"
            title="Voltar"
            disabled={isBusy}
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Nova Avaliação
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 sm:mt-1 sm:text-base">
              Monte sua avaliação com turma, questões e pesos
            </p>
          </div>
        </div>

        {feedbackSuccess && (
          <div className="mb-6 rounded-2xl border border-green-300 bg-green-50 p-4 text-center text-green-700">
            {feedbackSuccess}
          </div>
        )}

        {feedbackError && (
          <div className="mb-6 rounded-2xl border border-red-300 bg-red-50 p-4 text-center text-red-700">
            {feedbackError}
          </div>
        )}

        {classesError && (
          <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-center text-amber-700">
            {classesError}
          </div>
        )}

        {isInitialPageLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-medium">Carregando turmas...</span>
            </div>
          </div>
        ) : (
          <>
            <AssessmentBasicForm
              form={form}
              classes={classes}
              errors={formErrors}
              onChange={handleFormChange}
            />

            {classesLoading && classes.length > 0 && (
              <div className="mb-6 mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Atualizando turmas...
              </div>
            )}

            <QuestionFilters
              filters={questionFilters}
              onChange={handleFilterChange}
              onClear={clearQuestionFilters}
            />

            <QuestionsSelector
              questions={questions}
              selectedIds={selectedQuestionIds}
              loading={questionsLoading}
              error={questionsError}
              page={questionsMeta.page}
              totalPages={questionsMeta.totalPages}
              total={questionsMeta.total}
              onToggle={toggleQuestionSelection}
              onRetry={() => loadQuestions(questionsPage)}
              onChangePage={setQuestionsPage}
            />

            <SelectedQuestionsWeights
              items={selectedQuestions}
              onWeightChange={handleWeightChange}
              onRemove={handleRemoveSelected}
              totalScore={totalScore}
            />

            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Questões selecionadas:{" "}
                    <span className="font-bold">{selectedQuestions.length}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    Soma total dos pesos:{" "}
                    <span className="font-semibold text-slate-700">
                      {totalScore}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleOpenPreview}
                    disabled={isBusy}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {previewLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Abrindo preview...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Preview
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isBusy}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2EC5B6] bg-white px-5 py-3 text-sm font-semibold text-[#2EC5B6] transition hover:bg-[#eafaf8] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {savingDraft ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Salvando rascunho...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Salvar rascunho
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateAssessment}
                    disabled={isBusy}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2EC5B6] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#27b3a6] disabled:cursor-not-allowed disabled:opacity-70"
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
          </>
        )}

        <AssessmentPreviewModal
          open={previewOpen}
          draft={previewDraft}
          onClose={() => {
            if (savingDraft || creating) return;
            setPreviewOpen(false);
          }}
          onSaveDraft={handleSaveDraft}
          onCreate={handleCreateAssessment}
          savingDraft={savingDraft}
          creating={creating}
        />
      </div>
    </main>
  );
}