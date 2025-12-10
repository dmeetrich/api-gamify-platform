import { ApiProperty } from '@nestjs/swagger';

export class ApiEmptyResponse {
  @ApiProperty({
    description: 'Статус операции',
    example: 'success',
  })
  status: string;
}
