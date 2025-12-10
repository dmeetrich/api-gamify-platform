import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmptyDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiUpdateQuizPayload {
  @ApiProperty({
    description: 'Цвет фона',
    example: '#BA3840',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  bgColor?: string;

  @ApiProperty({
    description: 'Описание викторины',
    example: 'Выполните 4 задания для получения ваучера на ужин для двоих в ресторане Свой Ресторан',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  description?: string;

  @ApiProperty({
    description: 'Base64 изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  image?: string;

  @ApiProperty({
    description: 'Base64 маленького изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  imageSmall?: string;

  @ApiProperty({
    description: 'Краткое описание викторины',
    example: 'Получите ваучер для ужина',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  shortDescription?: string;

  @ApiProperty({
    description: 'Название викторины',
    example: 'Вечер для двоих',
    required: false,
  })
  @IsStringDefault()
  @IsNotEmptyDefault
  title?: string;
}
