import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email;
  
  @IsNotEmpty()
  name;

  @IsNotEmpty()
  @IsStrongPassword()
  password;
}
