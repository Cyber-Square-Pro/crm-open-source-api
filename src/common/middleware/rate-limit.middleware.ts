import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter: RateLimiterMemory;

  constructor() {
    this.limiter = new RateLimiterMemory({
      points: 3,
      duration: 60,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.limiter.consume(req.ip);
      next();
    } catch (error) {
      return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
        succes: false,
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Rate limit exceeded. Please try again later.',
        data: [],
        error: [],
      });
    }
  }
}
