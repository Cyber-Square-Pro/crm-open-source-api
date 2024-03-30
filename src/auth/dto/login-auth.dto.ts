import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
     /**
      * email field
      * @example 'shahid@mailinator.com'
     */
    @ApiProperty({
        description: `An email`,
        example: 'shahid@mailinator.com',
    })
    @IsEmail() 
    email: string;
  
    @IsNotEmpty()
    password: string;
}
