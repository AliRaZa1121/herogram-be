import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { MediaType } from '../../../utilities/enums/media.enum';

export class CreateMediaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @ApiProperty()
  @IsNotEmpty()
  path: string;
}
