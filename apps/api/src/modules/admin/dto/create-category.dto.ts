import { IsEmpty, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsHexColor()
  @IsOptional()
  color?;
}
