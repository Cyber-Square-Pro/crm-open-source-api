import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
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
  await app.listen(port).then(async ()=>{
    const url = await app.getUrl();
    logger.log(url);
  });
}
bootstrap();
