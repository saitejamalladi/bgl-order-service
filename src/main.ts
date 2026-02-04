import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTML test page
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('BGL Order Service API')
    .setDescription(`API for calculating optimal grocery order packaging and pricing.
    
    **Business Rules:**
    - Products have multiple packaging options with different pricing
    - Orders should minimize the number of packages (greedy algorithm)
    - Remainder items are charged at unit price
    
    **Available Products:**
    - CE (Cheese): Bundles of 5 ($20.95), 3 ($14.95)
    - HM (Ham): Bundles of 8 ($40.95), 5 ($29.95), 2 ($13.95)
    - SS (Soy Sauce): Only individual ($11.95)`)
    .setVersion('1.0')
    .setContact('BGL Assessment', '', 'assessment@bgl.com')
    .addTag('products', 'Product management endpoints')
    .addTag('orders', 'Order calculation endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('Application is running on: http://localhost:3000');
  console.log('Swagger documentation: http://localhost:3000/api/docs');
}
bootstrap();
