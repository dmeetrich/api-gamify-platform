import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ApiCreateQuizPayload } from './models/api-create-quiz-payload';
import { ApiQuizListResponse } from './models/api-quiz-list-response';
import { ApiQuizResponse } from './models/api-quiz-response';
import { ApiUpdateQuizPayload } from './models/api-update-quiz-payload';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(payload: ApiCreateQuizPayload): Promise<ApiQuizResponse> {
    const quiz = await this.prisma.quiz.create({
      data: {
        title: payload.title,
        description: payload.description,
        shortDescription: payload.shortDescription,
        bannerBgColor: payload.bannerBgColor,
        bgColor: payload.bgColor,
        image: payload.image,
        imageSmall: payload.widgetImage,
      },
      include: { tasks: true },
    });

    return this.mapToResponse(quiz);
  }

  async deleteQuiz(entityId: number): Promise<void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${entityId} not found`);
    }

    await this.prisma.quiz.delete({
      where: { entityId },
    });
  }

  async getAllQuizzes(): Promise<ApiQuizListResponse> {
    const [items, total] = await Promise.all([
      this.prisma.quiz.findMany({
        orderBy: { entityId: 'desc' },
      }),
      this.prisma.quiz.count(),
    ]);

    return {
      items: items.map((quiz) => ({
        bannerBgColor: quiz.bannerBgColor,
        bgColor: quiz.bgColor,
        description: quiz.description,
        entityId: quiz.entityId,
        image: quiz.image,
        widgetImage: quiz.imageSmall,
        shortDescription: quiz.shortDescription,
        title: quiz.title,
        uuid: quiz.uuid,
      })),
      total,
    };
  }

  async getQuizById(entityId: number, phone?: string): Promise<ApiQuizResponse> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId },
      include: {
        tasks: {
          include: {
            progress: phone ? { where: { phone } } : false,
          },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${entityId} not found`);
    }

    return this.mapToResponse(quiz);
  }

  async updateQuiz(entityId: number, payload: ApiUpdateQuizPayload): Promise<ApiQuizResponse> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${entityId} not found`);
    }

    const updatedQuiz = await this.prisma.quiz.update({
      where: { entityId },
      data: {
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.description !== undefined && { description: payload.description }),
        ...(payload.shortDescription !== undefined && { shortDescription: payload.shortDescription }),
        ...(payload.bannerBgColor !== undefined && { bannerBgColor: payload.bannerBgColor }),
        ...(payload.bgColor !== undefined && { bgColor: payload.bgColor }),
        ...(payload.image !== undefined && { image: payload.image }),
        ...(payload.widgetImage !== undefined && { imageSmall: payload.widgetImage }),
      },
      include: { tasks: true },
    });

    return this.mapToResponse(updatedQuiz);
  }

  private mapToResponse(quiz: {
    entityId: number;
    uuid: string;
    title: string;
    description: string;
    shortDescription: string;
    bannerBgColor: string;
    bgColor: string;
    image: string;
    imageSmall: string;
    tasks: Array<{
      entityId: number;
      quizId: number;
      extId: string;
      title: string;
      description: string;
      url: string;
      progress?: Array<{ id: number }>;
    }>;
  }): ApiQuizResponse {
    const totalTasks = quiz.tasks.length;
    let completedTasks = 0;
    let hasProgress = false;

    const tasks = quiz.tasks.map((task) => {
      if (task.progress !== undefined) {
        hasProgress = true;
        if (task.progress.length > 0) completedTasks += 1;
      }

      return {
        entityId: task.entityId,
        extId: task.extId,
        title: task.title,
        description: task.description,
        url: task.url,
        ...(task.progress !== undefined && { isCompleted: task.progress.length > 0 }),
      };
    });

    return {
      bannerBgColor: quiz.bannerBgColor,
      bgColor: quiz.bgColor,
      description: quiz.description,
      entityId: quiz.entityId,
      image: quiz.image,
      widgetImage: quiz.imageSmall,
      progress: {
        ...(hasProgress ? { completedTasks } : {}),
        totalTasks,
      },
      shortDescription: quiz.shortDescription,
      tasks,
      title: quiz.title,
      uuid: quiz.uuid,
    };
  }
}
