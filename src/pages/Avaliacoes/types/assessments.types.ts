export type AssessmentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Assessment {
  id: string;
  title: string;
  date: string;
  totalScore: number;
  status: AssessmentStatus;
  classId: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentFormData {
  title: string;
  date: string;
  classId: string;
}

export interface AssessmentQuestionItem {
  questionId: string;
  weight: number;
}

export interface CreateAssessmentDTO {
  title: string;
  date: string;
  classId: string;
  totalScore: number;
  status: AssessmentStatus;
  questions: AssessmentQuestionItem[];
}

export interface ClassOption {
  id: string;
  name: string;
  gradeLevel: string | null;
}

export interface QuestionItem {
  alternatives: any;
  id: string;
  statement: string;
  content: string;
  subject: string;
  schoolYear: string;
  difficulty: QuestionDifficulty;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AssessmentFilters {
  classId?: string;
  status?: AssessmentStatus | "";
  page?: number;
  limit?: number;
}

export interface QuestionFiltersState {
  subject: string;
  difficulty: QuestionDifficulty | "";
  schoolYear: string;
  myQuestionsOnly: boolean;
}

export interface SelectedAssessmentQuestion {
  questionId: string;
  statement: string;
  subject?: string;
  difficulty?: string;
  weight: number;
  order: number;
  alternatives?: {
    id: string;
    text: string;
  }[];
}

export interface AssessmentAlternative {
  id: string;
  text: string;
}

export interface SelectedAssessmentQuestion {
  questionId: string;
  statement: string;
  subject?: string;
  difficulty?: string;
  weight: number;
  order: number;
  alternatives?: AssessmentAlternative[];
}

export interface AssessmentDraft {
  title: string;
  classId: string;
  className?: string;
  applicationDate: string;
  description?: string;
  selectedQuestions: SelectedAssessmentQuestion[];
}