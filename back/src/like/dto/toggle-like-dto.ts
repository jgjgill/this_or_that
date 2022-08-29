import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TogglePostLikeDto {
  @IsNumber()
  @ApiProperty({
    name: 'postId',
    example: 1,
    required: true,
  })
  postId: number;
}
