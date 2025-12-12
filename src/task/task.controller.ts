import { Body, Param, ParseIntPipe } from '@nestjs/common';

import { DeleteAction, GetAction, PatchAction, PostAction, TagController } from '../infrastructure/decorators/controllers-decorators';
import { ApiEmptyResponse } from '../infrastructure/models/api-empty-response';
import { ApiCompleteTaskPayload } from './models/api-complete-task-payload';
import { ApiCreateTaskPayload } from './models/api-create-task-payload';
import { ApiTaskDetailResponse } from './models/api-task-detail-response';
import { ApiTaskListResponse } from './models/api-task-list-response';
import { ApiUpdateTaskPayload } from './models/api-update-task-payload';
import { TaskService } from './task.service';

@TagController('task', 1)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @PostAction({
    description: 'Отметить задание как выполненное',
    response: ApiEmptyResponse,
    path: 'complete',
  })
  async completeTask(@Body() payload: ApiCompleteTaskPayload): Promise<ApiEmptyResponse> {
    await this.taskService.completeTask(payload);
    return { status: 'success' };
  }

  @PostAction({
    description: 'Создание задания',
    response: ApiTaskDetailResponse,
  })
  createTask(@Body() payload: ApiCreateTaskPayload): Promise<ApiTaskDetailResponse> {
    return this.taskService.createTask(payload);
  }

  @DeleteAction({
    description: 'Удаление задания',
    response: ApiEmptyResponse,
    path: ':entityId',
  })
  async deleteTask(@Param('entityId', ParseIntPipe) entityId: number): Promise<ApiEmptyResponse> {
    await this.taskService.deleteTask(entityId);
    return { status: 'success' };
  }

  @GetAction({
    description: 'Получение списка всех заданий',
    response: ApiTaskListResponse,
  })
  getAllTasks(): Promise<ApiTaskListResponse> {
    return this.taskService.getAllTasks();
  }

  @GetAction({
    description: 'Получение задания по ID',
    response: ApiTaskDetailResponse,
    path: ':entityId',
  })
  getTaskById(@Param('entityId', ParseIntPipe) entityId: number): Promise<ApiTaskDetailResponse> {
    return this.taskService.getTaskById(entityId);
  }

  @GetAction({
    description: 'Получение всех заданий по ID викторины',
    response: ApiTaskListResponse,
    path: 'by-quiz/:quizId',
  })
  getTasksByQuizId(@Param('quizId', ParseIntPipe) quizId: number): Promise<ApiTaskListResponse> {
    return this.taskService.getTasksByQuizId(quizId);
  }

  @PatchAction({
    description: 'Обновление задания',
    response: ApiTaskDetailResponse,
    path: ':entityId',
  })
  updateTask(@Param('entityId', ParseIntPipe) entityId: number, @Body() payload: ApiUpdateTaskPayload): Promise<ApiTaskDetailResponse> {
    return this.taskService.updateTask(entityId, payload);
  }
}
