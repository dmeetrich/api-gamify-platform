import { ApiProperty } from '@nestjs/swagger';

import { IsIntDefault, IsPhoneNumberDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiCompleteTaskPayload {
  @ApiProperty({
    description: 'Номер телефона пользователя',
    example: '+79991234567',
  })
  @IsPhoneNumberDefault
  phone: string;

  @ApiProperty({
    description: 'ID задания',
    example: 1,
  })
  @IsIntDefault
  taskId: number;
}
