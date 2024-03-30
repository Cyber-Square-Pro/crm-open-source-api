import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupAuthDto {
    @IsEmail() 
    email: string;
  
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    language: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    timezone: string;
}
