import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty()
  @IsOptional()
  done?: boolean;
}
