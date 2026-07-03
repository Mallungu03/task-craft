import { IsHexColor, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsHexColor()
  @IsOptional()
  color?: string;
}