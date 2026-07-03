import { IsBoolean, IsDate, IsEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Priority } from 'generated/prisma/enums';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title;

  @IsString()
  @IsEmpty()
  content;

  @IsEnum(Priority)
  priority;
  
  @IsDate()
  dueDate;
}
