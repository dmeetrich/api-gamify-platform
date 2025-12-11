import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { IsNotEmptyDefault, IsStringDefault } from '../../infrastructure/utils/class-validator-decorators';

export class ApiUpdateQuizPayload {
  @ApiProperty({
    description: 'Цвет фона баннера',
    example: '#BA3840',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  bannerBgColor?: string;

  @ApiProperty({
    description: 'Цвет фона',
    example: '#BA3840',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  bgColor?: string;

  @ApiProperty({
    description: 'Описание викторины',
    example: 'Выполните 4 задания для получения ваучера на ужин для двоих в ресторане Свой Ресторан',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  description?: string;

  @ApiProperty({
    description: 'Base64 изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  image?: string;

  @ApiProperty({
    description: 'Краткое описание викторины',
    example: 'Получите ваучер для ужина',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  shortDescription?: string;

  @ApiProperty({
    description: 'Название викторины',
    example: 'Вечер для двоих',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  title?: string;

  @ApiProperty({
    description: 'Base64 маленького изображения',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
    required: false,
  })
  @IsOptional()
  @IsStringDefault()
  @IsNotEmptyDefault
  widgetImage?: string;
}
