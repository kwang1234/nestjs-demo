import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('cats example')
    .setDescription('the cats api desc')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());

  await app.listen(3000);
}
bootstrap();
