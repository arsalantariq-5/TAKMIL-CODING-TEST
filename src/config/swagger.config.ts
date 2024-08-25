import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Broiler Backend API')
  .setDescription('Broiler API description')
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
