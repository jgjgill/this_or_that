import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateVoteDto {
  @IsNumber()
  @ApiProperty({
    name: 'postId',
    example: 1,
    required: true,
  })
  postId: number;

  @ApiProperty({
    name: 'assignedBy',
    example: 'this',
    required: true,
  })
  assignedBy: 'this' | 'that';
}
