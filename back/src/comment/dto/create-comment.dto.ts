import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @ApiProperty({
    name: 'comment',
    example: 'comment1',
    required: true,
  })
  comment: string;
}
