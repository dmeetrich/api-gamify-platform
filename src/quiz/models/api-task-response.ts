import { ApiProperty } from '@nestjs/swagger';

export class ApiTaskResponse {
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
    description: 'Название задания',
    example: 'Откройте вклад',
  })
  title: string;
}
