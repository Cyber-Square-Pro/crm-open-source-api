import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/common/function/jwt';

@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private tokenType: string) {}

  private jwtService = new JwtService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = await extractTokenFromHeader(request);
      const secret = this.tokenType === 'access' ? process.env.JWT_ACCESS_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
      const decodedToken = this.jwtService.verify(token, { secret });
      if (decodedToken && decodedToken.userId) {
        request.userId = decodedToken.userId;
        request.refreshToken = token;
        return true;
      }
      throw new HttpException({
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden resource',
        data:[],
        error: [],
      }, HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException({
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden resource',
        data:[],
        error: [],
      }, HttpStatus.FORBIDDEN);
    }
  }
}
