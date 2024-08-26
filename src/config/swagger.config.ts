import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Takmil Backend API')
  .setDescription('Takmil API description')
  .setVersion('1.0')
  .addApiKey({
    type: 'apiKey',
    name: 'X-API-Key',
    in: 'header',
  })
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'Authorization',
  })
  .build();
