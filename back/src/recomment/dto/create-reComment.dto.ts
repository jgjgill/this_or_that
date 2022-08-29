import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReCoomentDto {
  @IsString()
  @ApiProperty({
    name: 'comment',
    example: 'recomment1',
    required: true,
  })
  comment: string;
}
