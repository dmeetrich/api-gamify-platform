import { ApiProperty } from '@nestjs/swagger';

import { ApiTaskResponse } from './api-task-response';

export class ApiQuizProgressResponse {
  @ApiProperty({
    description: 'Количество выполненных заданий (доступно при передаче phone)',
    example: 2,
    required: false,
  })
  completedTasks?: number;

  @ApiProperty({
    description: 'Общее количество заданий',
    example: 4,
  })
  totalTasks: number;
}

export class ApiQuizResponse {
  @ApiProperty({
    description: 'Цвет фона баннера',
    example: '#BA3840',
  })
  bannerBgColor: string;

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
    description: 'Прогресс прохождения викторины',
    type: ApiQuizProgressResponse,
  })
  progress: ApiQuizProgressResponse;

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

  @ApiProperty({
    description: 'Base64 маленького изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
  })
  widgetImage: string;
}
