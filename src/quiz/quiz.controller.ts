import { Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

import { DeleteAction, GetAction, PatchAction, PostAction, TagController } from '../infrastructure/decorators/controllers-decorators';
import { ApiEmptyResponse } from '../infrastructure/models/api-empty-response';
import { ApiCreateQuizPayload } from './models/api-create-quiz-payload';
import { ApiQuizListResponse } from './models/api-quiz-list-response';
import { ApiQuizResponse } from './models/api-quiz-response';
import { ApiUpdateQuizPayload } from './models/api-update-quiz-payload';
import { QuizService } from './quiz.service';

@TagController('quiz', 1)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @PostAction({
    description: 'Создание викторины',
    response: ApiQuizResponse,
  })
  createQuiz(@Body() payload: ApiCreateQuizPayload): Promise<ApiQuizResponse> {
    return this.quizService.createQuiz(payload);
  }

  @DeleteAction({
    description: 'Удаление викторины',
    response: ApiEmptyResponse,
    path: ':entityId',
  })
  async deleteQuiz(@Param('entityId', ParseIntPipe) entityId: number): Promise<ApiEmptyResponse> {
    await this.quizService.deleteQuiz(entityId);
    return { status: 'success' };
  }

  @GetAction({
    description: 'Получение списка всех викторин',
    response: ApiQuizListResponse,
  })
  getAllQuizzes(): Promise<ApiQuizListResponse> {
    return this.quizService.getAllQuizzes();
  }

  @GetAction({
    description: 'Получение викторины по ID',
    response: ApiQuizResponse,
    path: ':entityId',
  })
  @ApiQuery({
    name: 'phone',
    required: false,
    description: 'Номер телефона для проверки статуса выполнения заданий',
    type: String,
  })
  getQuizById(@Param('entityId', ParseIntPipe) entityId: number, @Query('phone') phone?: string): Promise<ApiQuizResponse> {
    return this.quizService.getQuizById(entityId, phone);
  }

  @PatchAction({
    description: 'Обновление викторины',
    response: ApiQuizResponse,
    path: ':entityId',
  })
  updateQuiz(@Param('entityId', ParseIntPipe) entityId: number, @Body() payload: ApiUpdateQuizPayload): Promise<ApiQuizResponse> {
    return this.quizService.updateQuiz(entityId, payload);
  }
}
