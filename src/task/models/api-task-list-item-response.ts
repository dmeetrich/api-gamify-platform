import { ApiProperty } from '@nestjs/swagger';

export class ApiTaskListItemResponse {
  @ApiProperty({
    description: 'Описание задания',
    example: 'Необходимо открыть новый вклад с любыми условиями',
  })
  description: string;

  @ApiProperty({
    description: 'ID сущности задания',
    example: 1,
  })
  entityId: number;

  @ApiProperty({
    description: 'Внешний ID задания',
    example: 'task-001',
  })
  extId: string;

  @ApiProperty({
    description: 'ID викторины',
    example: 1,
  })
  quizId: number;

  @ApiProperty({
    description: 'Название задания',
    example: 'Откройте вклад',
  })
  title: string;

  @ApiProperty({
    description: 'URL задания',
    example: '/rshb-mbfl/webmodules/deposits/?apiVersion=48&block=1&mobile=false&isOf=false&moduleApiVersion=1',
  })
  url: string;
}
