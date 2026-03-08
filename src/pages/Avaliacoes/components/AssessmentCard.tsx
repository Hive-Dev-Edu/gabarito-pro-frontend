import { Calendar, FileText } from "lucide-react";
import type { Assessment } from "../types/assessments.types";

const STATUS_LABEL = {
  DRAFT: "Rascunho",
  PUBLISHED: "Publicada",
  ARCHIVED: "Arquivada",
};

const STATUS_COLOR = {
  DRAFT: "bg-yellow-100 text-yellow-700",
  PUBLISHED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-gray-100 text-gray-700",
};

interface AssessmentCardProps {
  assessment: Assessment;
}

export default function AssessmentCard({ assessment }: AssessmentCardProps) {
  const formattedDate = new Date(assessment.date).toLocaleDateString("pt-BR");

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-gray-800 font-semibold text-lg">
            {assessment.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-2 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <Calendar size={14} />
              {formattedDate}
            </span>

            <span className="inline-flex items-center gap-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              <FileText size={14} />
              Total: {assessment.totalScore}
            </span>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                STATUS_COLOR[assessment.status]
              }`}
            >
              {STATUS_LABEL[assessment.status]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}