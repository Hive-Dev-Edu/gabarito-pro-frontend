import type { Questao } from "../../Questoes/types/questoes.types";
import ItemQuestaoSelecionada from "./ItemQuestaoSelecionada";

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
  questoes: QuestaoSelecionadaLocal[];
  atualizarPeso: (id: string, peso: number) => void;
  remover: (id: string) => void;
}

export default function ListaQuestoesSelecionadas({
  questoes,
  atualizarPeso,
  remover,
}: Props) {
  const questoesOrdenadas = [...questoes].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-3">
      {questoesOrdenadas.map((questao) => (
        <ItemQuestaoSelecionada
          key={questao.questionId}
          questao={questao}
          atualizarPeso={atualizarPeso}
          remover={remover}
        />
      ))}
    </div>
  );
}