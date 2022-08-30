import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReCoomentDto {
  @IsString()
  @ApiProperty({
    name: 'reComment',
    example: 'recomment1',
    required: true,
  })
  comment: string;
}
