import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { Password } from './password.schema';
import { SignupAuthDto } from './dto/signup-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateTokenPair } from 'src/common/function/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) 
    private readonly userModel: Model<User>,
    @InjectModel(Password.name) 
    private readonly passwordModel: Model<Password>,
    private jwtService: JwtService
  ){}

  private readonly logger = new Logger(AuthService.name);

  async signup(signupAuthDto: SignupAuthDto) {
    try{
      const email = signupAuthDto.email.toLowerCase();
      const userFoundAlready = await this.userModel.findOne({ email });
      if(userFoundAlready) {
        return {statusCode: HttpStatus.CONFLICT, message: 'signup.exist'};
      } else {
        const createdUser = await this.userModel.create({
          email,
          name: signupAuthDto.name,
          country: signupAuthDto.country
        });
        const salt = await bcrypt.genSalt();
        const passwordHash =  await bcrypt.hash(signupAuthDto.password, salt);
        await this.passwordModel.create({
          passwordHash,
          userId: createdUser._id
        });
        return {
          statusCode: HttpStatus.OK, 
          message: 'signup.success', 
          data: {email}
        };
      }
    }catch(e){
      this.logger.error(e);
      return {statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: ''};
    }
  }

  async login(loginAuthDto:LoginAuthDto) {
    try{
      const email = loginAuthDto.email.toLowerCase();
      const password = loginAuthDto.password;
      const userFound = await this.userModel.findOne({email});
      if(userFound){
        const passwordMatch = await this.passwordModel.findOne({userId: userFound._id, isActive:true});
        if(passwordMatch) {
          const passwordHash = passwordMatch.passwordHash;
          const isPasswordValid = await bcrypt.compare(password,passwordHash);
          if(isPasswordValid) {
            const token = await generateTokenPair(this.jwtService, userFound);
            return {
              statusCode: HttpStatus.OK, 
              message: 'login.success', 
              data: {
                name: userFound.name,
                email,
                token
              }
            };
          } else {
            return {statusCode: HttpStatus.BAD_REQUEST, message: 'login.incorrect'};
          }
        } else {
          return {statusCode: HttpStatus.BAD_REQUEST, message: 'login.incorrect'};
        }
      } else {
        return {statusCode: HttpStatus.BAD_REQUEST, message: 'login.incorrect'};
      }
    }catch(e){
      this.logger.error(e);
      return {statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: ''};
    }
  }

}
