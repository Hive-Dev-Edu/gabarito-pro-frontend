import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AssessmentPreviewSheet } from './components/AssessmentPreviewSheet';
import type { AssessmentDraft } from './types/assessments.types';

interface LocationState {
  draft?: AssessmentDraft;
}

export default function PreviewAvaliacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const draft = useMemo<AssessmentDraft>(() => {
    return (
      state?.draft ?? {
        title: '',
        classId: '',
        className: '',
        applicationDate: '',
        description: '',
        selectedQuestions: [],
      }
    );
  }, [state]);

  const handleBack = () => {
    navigate('/avaliacoes/criar', {
      state: { draft },
    });
  };

  const handleSave = async () => {
    try {
      console.log('Salvar avaliação:', draft);

      // Depois aqui você substitui pela chamada real do service
      // await createAssessment(draft)

      navigate('/avaliacoes');
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Preview da Avaliação
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Revise a estrutura da prova e a ordem das questões antes de
              finalizar.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Voltar para edição
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Salvar avaliação
            </button>
          </div>
        </div>

        <AssessmentPreviewSheet draft={draft} />
      </div>
    </div>
  );
}