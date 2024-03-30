import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryModule } from './country/country.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseModelInterceptor } from './common/interceptor/response.interceptor';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { validate } from './common/config/env.validation';
import { ValidationExceptionFilter } from './common/filter/validation-exception.filter';
import { JwtModule } from '@nestjs/jwt';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { GlobalLoggerMiddleware } from './common/middleware/global-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(
      { isGlobal: true,
        expandVariables: true,
        load: [configuration],
        validate
      }
    ),
    JwtModule.register({
      global: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/crm'),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    AuthModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseModelInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const rateLimitedRoutes = ['/login'];
    consumer.apply(RateLimitMiddleware).forRoutes(...rateLimitedRoutes);
    consumer.apply(GlobalLoggerMiddleware).forRoutes('*');
  }
}
