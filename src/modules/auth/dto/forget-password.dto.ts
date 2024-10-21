import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordRequestDTO {
  @ApiProperty({
    example: 'string@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
