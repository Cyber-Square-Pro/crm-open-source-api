import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Password } from './password.schema';
import { SignupAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    @InjectModel(Password.name) 
    private readonly passwordModel: Model<Password>
  ){}

  async signup(signupAuthDto: SignupAuthDto) {
    try{
      const userFoundAlready = await this.userModel.findOne({email: signupAuthDto.email});
      if(userFoundAlready) {
        return {statusCode: HttpStatus.CONFLICT, message: ''};
      } else {
        return {statusCode: HttpStatus.OK, message: 'signup.success'};
      }
      
    }catch(e){
      return {statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: ''};
    }
  }

  async login(loginAuthDto:LoginAuthDto) {
    try{
      
      return {statusCode: HttpStatus.OK, message: ''};
    }catch(e){
      return {statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: ''};
    }
  }

}
