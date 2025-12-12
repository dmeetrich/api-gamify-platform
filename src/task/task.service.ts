import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ApiCompleteTaskPayload } from './models/api-complete-task-payload';
import { ApiCreateTaskPayload } from './models/api-create-task-payload';
import { ApiTaskDetailResponse } from './models/api-task-detail-response';
import { ApiTaskListResponse } from './models/api-task-list-response';
import { ApiUpdateTaskPayload } from './models/api-update-task-payload';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async completeTask(payload: ApiCompleteTaskPayload): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { entityId: payload.taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${payload.taskId} not found`);
    }

    await this.prisma.taskProgress.upsert({
      where: {
        phone_taskId: {
          phone: payload.phone,
          taskId: payload.taskId,
        },
      },
      create: {
        phone: payload.phone,
        taskId: payload.taskId,
      },
      update: {},
    });
  }

  async createTask(payload: ApiCreateTaskPayload): Promise<ApiTaskDetailResponse> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId: payload.quizId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${payload.quizId} not found`);
    }

    const task = await this.prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        extId: payload.extId,
        quizId: payload.quizId,
        url: payload.url,
      },
    });

    return this.mapToDetailResponse(task);
  }

  async deleteTask(entityId: number): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { entityId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${entityId} not found`);
    }

    await this.prisma.task.delete({
      where: { entityId },
    });
  }

  async getAllTasks(): Promise<ApiTaskListResponse> {
    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        orderBy: { entityId: 'desc' },
      }),
      this.prisma.task.count(),
    ]);

    return {
      items: items.map((task) => ({
        description: task.description,
        entityId: task.entityId,
        extId: task.extId,
        quizId: task.quizId,
        title: task.title,
        url: task.url,
      })),
      total,
    };
  }

  async getTaskById(entityId: number): Promise<ApiTaskDetailResponse> {
    const task = await this.prisma.task.findUnique({
      where: { entityId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${entityId} not found`);
    }

    return this.mapToDetailResponse(task);
  }

  async getTasksByQuizId(quizId: number): Promise<ApiTaskListResponse> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { entityId: quizId },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        where: { quizId },
        orderBy: { entityId: 'desc' },
      }),
      this.prisma.task.count({
        where: { quizId },
      }),
    ]);

    return {
      items: items.map((task) => ({
        description: task.description,
        entityId: task.entityId,
        extId: task.extId,
        quizId: task.quizId,
        title: task.title,
        url: task.url,
      })),
      total,
    };
  }

  async updateTask(entityId: number, payload: ApiUpdateTaskPayload): Promise<ApiTaskDetailResponse> {
    const task = await this.prisma.task.findUnique({
      where: { entityId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${entityId} not found`);
    }

    if (payload.quizId !== undefined) {
      const quiz = await this.prisma.quiz.findUnique({
        where: { entityId: payload.quizId },
      });

      if (!quiz) {
        throw new NotFoundException(`Quiz with ID ${payload.quizId} not found`);
      }
    }

    const updatedTask = await this.prisma.task.update({
      where: { entityId },
      data: {
        ...(payload.title !== undefined && { title: payload.title }),
        ...(payload.description !== undefined && { description: payload.description }),
        ...(payload.extId !== undefined && { extId: payload.extId }),
        ...(payload.quizId !== undefined && { quizId: payload.quizId }),
        ...(payload.url !== undefined && { url: payload.url }),
      },
    });

    return this.mapToDetailResponse(updatedTask);
  }

  private mapToDetailResponse(task: {
    entityId: number;
    quizId: number;
    extId: string;
    title: string;
    description: string;
    url: string;
  }): ApiTaskDetailResponse {
    return {
      description: task.description,
      entityId: task.entityId,
      extId: task.extId,
      quizId: task.quizId,
      title: task.title,
      url: task.url,
    };
  }
}
