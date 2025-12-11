import { ApiProperty } from '@nestjs/swagger';

export class ApiQuizListItemResponse {
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
    description: 'URL изображения',
    example: 'https://example.com/image.jpg',
  })
  image: string;

  @ApiProperty({
    description: 'Краткое описание викторины',
    example: 'Получите ваучер для ужина',
  })
  shortDescription: string;

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
    description: 'URL маленького изображения',
    example: 'https://example.com/image-small.jpg',
  })
  widgetImage: string;
}
