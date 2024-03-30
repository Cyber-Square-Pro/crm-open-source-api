import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as csurf from 'csurf';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(csurf({ cookie: true }));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe(
      { 
        whitelist: true,
        transform: true
      }
    )
  );
  app.setGlobalPrefix('api');
  const port = parseInt(process.env.PORT, 10);
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
