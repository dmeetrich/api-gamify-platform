import { ApiProperty } from '@nestjs/swagger';

import { ApiTaskListItemResponse } from './api-task-list-item-response';

export class ApiTaskListResponse {
  @ApiProperty({
    description: 'Список заданий',
    type: [ApiTaskListItemResponse],
  })
  items: ApiTaskListItemResponse[];

  @ApiProperty({
    description: 'Общее количество заданий',
    example: 42,
  })
  total: number;
}
