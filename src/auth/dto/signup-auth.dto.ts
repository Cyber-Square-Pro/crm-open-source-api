import { IntersectionType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class SignupAuthDto  extends IntersectionType(LoginAuthDto)
{  
    @IsNotEmpty()
    language: string;

    @IsNotEmpty()
    name: string;
}
