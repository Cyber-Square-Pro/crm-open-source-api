import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {statusCode:HttpStatus.OK,message:'Hello World!'};
  }
}
