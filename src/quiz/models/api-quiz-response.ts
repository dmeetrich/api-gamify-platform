import { ApiProperty } from '@nestjs/swagger';

import { ApiTaskResponse } from './api-task-response';

export class ApiQuizResponse {
  @ApiProperty({
    description: 'Цвет фона',
    example: '#BA3840',
  })
  bgColor: string;

  @ApiProperty({
    description: 'Описание викторины',
    example: 'Выполните 4 задания для получения ваучера на ужин для двоих в ресторане Свой Ресторан',
  })
  description: string;

  @ApiProperty({
    description: 'ID сущности',
    example: 1,
  })
  entityId: number;

  @ApiProperty({
    description: 'Base64 изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
  })
  image: string;

  @ApiProperty({
    description: 'Base64 маленького изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
  })
  imageSmall: string;

  @ApiProperty({
    description: 'Краткое описание викторины',
    example: 'Получите ваучер для ужина',
  })
  shortDescription: string;

  @ApiProperty({
    description: 'Список заданий',
    type: [ApiTaskResponse],
  })
  tasks: ApiTaskResponse[];

  @ApiProperty({
    description: 'Название викторины',
    example: 'Вечер для двоих',
  })
  title: string;

  @ApiProperty({
    description: 'UUID викторины',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  uuid: string;
}
