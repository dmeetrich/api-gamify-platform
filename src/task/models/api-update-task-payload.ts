import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IsIntDefault, IsNotEmptyDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiUpdateTaskPayload {
  @ApiProperty({
    description: 'Описание задания',
    example: 'Необходимо открыть новый вклад с любыми условиями',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  description?: string;

  @ApiProperty({
    description: 'Внешний ID задания',
    example: 'task-001',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  extId?: string;

  @ApiProperty({
    description: 'ID викторины',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsIntDefault
  quizId?: number;

  @ApiProperty({
    description: 'Название задания',
    example: 'Откройте вклад',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  title?: string;

  @ApiProperty({
    description: 'URL задания',
    example: '/rshb-mbfl/webmodules/deposits/?apiVersion=48&block=1&mobile=false&isOf=false&moduleApiVersion=1',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  url?: string;
}
