import { Request } from 'express';

export interface JRequest extends Request {
  userId: string;
  refreshToken: string;
  accessToken: string;
}