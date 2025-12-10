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
        bgColor: payload.bgColor,
        image: payload.image,
        imageSmall: payload.imageSmall,
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
        bgColor: quiz.bgColor,
        description: quiz.description,
        entityId: quiz.entityId,
        image: quiz.image,
        imageSmall: quiz.imageSmall,
        shortDescription: quiz.shortDescription,
        title: quiz.title,
        uuid: quiz.uuid,
      })),
      total,
    };
  }

  async getQuizById(entityId: number): Promise<ApiQuizResponse> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId },
      include: { tasks: true },
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
        ...(payload.bgColor !== undefined && { bgColor: payload.bgColor }),
        ...(payload.image !== undefined && { image: payload.image }),
        ...(payload.imageSmall !== undefined && { imageSmall: payload.imageSmall }),
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
    bgColor: string;
    image: string;
    imageSmall: string;
    tasks: Array<{
      entityId: number;
      quizId: number;
      extId: string;
      title: string;
      description: string;
    }>;
  }): ApiQuizResponse {
    return {
      bgColor: quiz.bgColor,
      description: quiz.description,
      entityId: quiz.entityId,
      image: quiz.image,
      imageSmall: quiz.imageSmall,
      shortDescription: quiz.shortDescription,
      tasks: quiz.tasks.map((task) => ({
        entityId: task.entityId,
        extId: task.extId,
        title: task.title,
        description: task.description,
      })),
      title: quiz.title,
      uuid: quiz.uuid,
    };
  }
}
