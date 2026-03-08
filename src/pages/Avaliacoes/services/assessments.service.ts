import { httpClient } from "../../../utils/httpClient";
import type {
  Assessment,
  AssessmentFilters,
  ClassOption,
  CreateAssessmentDTO,
  PaginatedResponse,
  QuestionFiltersState,
  QuestionItem,
} from "../types/assessments.types";

class AssessmentsService {
  async getAssessments(
    filters: AssessmentFilters = {}
  ): Promise<PaginatedResponse<Assessment>> {
    const response = await httpClient.get("/assessments", {
      params: {
        classId: filters.classId || undefined,
        status: filters.status || undefined,
        page: filters.page || 1,
        limit: filters.limit || 10,
      },
    });

    return response.data;
  }

  async getClasses(page = 1, limit = 100): Promise<PaginatedResponse<ClassOption>> {
    const response = await httpClient.get("/classes", {
      params: { page, limit },
    });

    return response.data;
  }

  async getQuestions(
    filters: QuestionFiltersState,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<QuestionItem>> {
    const endpoint = filters.myQuestionsOnly ? "/questions/private" : "/questions";

    const response = await httpClient.get(endpoint, {
      params: {
        subject: filters.subject || undefined,
        schoolYear: filters.schoolYear || undefined,
        difficulty: filters.difficulty || undefined,
        page,
        limit,
      },
    });

    return response.data;
  }

  async createAssessment(data: CreateAssessmentDTO) {
    const response = await httpClient.post("/assessments", data);
    return response.data;
  }
}

export default new AssessmentsService();