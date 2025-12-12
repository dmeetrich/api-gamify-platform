import { ApiProperty } from '@nestjs/swagger';

import { IsIntDefault, IsNotEmptyDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiCreateTaskPayload {
  @ApiProperty({
    description: 'Описание задания',
    example: 'Необходимо открыть новый вклад с любыми условиями',
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  description: string;

  @ApiProperty({
    description: 'Внешний ID задания',
    example: 'task-001',
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  extId: string;

  @ApiProperty({
    description: 'ID викторины',
    example: 1,
  })
  @IsIntDefault
  quizId: number;

  @ApiProperty({
    description: 'Название задания',
    example: 'Откройте вклад',
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  title: string;

  @ApiProperty({
    description: 'URL задания',
    example: '/rshb-mbfl/webmodules/deposits/?apiVersion=48&block=1&mobile=false&isOf=false&moduleApiVersion=1',
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  url: string;
}
