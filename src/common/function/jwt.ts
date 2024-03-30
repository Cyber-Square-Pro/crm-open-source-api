import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { User } from 'src/auth/user.schema';

export async function extractTokenFromHeader(request: any): Promise<string> {
  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return null;
}

export async function generateTokenPair(
  jwtService: JwtService,
  userFound: mongoose.Document<unknown, object, User> &
    User & {
      _id: mongoose.Types.ObjectId;
    },
) {
  const accessToken = jwtService.sign(
    {
      userId: userFound._id,
    },
    {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRE),
    },
  );
  const refreshToken = jwtService.sign(
    {
      userId: userFound._id,
    },
    {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRE),
    },
  );
  return { accessToken, refreshToken };
}
