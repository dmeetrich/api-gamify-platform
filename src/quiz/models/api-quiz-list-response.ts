import { ApiProperty } from '@nestjs/swagger';

import { ApiQuizListItemResponse } from './api-quiz-list-item-response';

export class ApiQuizListResponse {
  @ApiProperty({
    description: 'Список викторин',
    type: [ApiQuizListItemResponse],
  })
  items: ApiQuizListItemResponse[];

  @ApiProperty({
    description: 'Общее количество викторин',
    example: 10,
  })
  total: number;
}
