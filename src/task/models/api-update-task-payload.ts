import { ApiProperty } from '@nestjs/swagger';

import { IsIntDefault, IsNotEmptyDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiUpdateTaskPayload {
  @ApiProperty({
    description: 'Описание задания',
    example: 'Необходимо открыть новый вклад с любыми условиями',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  description?: string;

  @ApiProperty({
    description: 'Внешний ID задания',
    example: 'task-001',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  extId?: string;

  @ApiProperty({
    description: 'ID викторины',
    example: 1,
    required: false,
  })
  @IsIntDefault
  quizId?: number;

  @ApiProperty({
    description: 'Название задания',
    example: 'Откройте вклад',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  title?: string;
}
