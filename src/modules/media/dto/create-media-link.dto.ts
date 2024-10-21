import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaLinkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  files: string[];
}
