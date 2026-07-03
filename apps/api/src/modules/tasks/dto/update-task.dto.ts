import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { Priority } from "generated/prisma/enums";

export class UpdateTaskDto {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsEnum(Priority)
    @IsOptional()
    priority?: string;
    
    @IsDate()
    @IsOptional()
    dueDate?: Date;
}
