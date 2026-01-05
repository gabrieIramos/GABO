import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('HubBra API')
    .setDescription('API para a loja HubBra - Produtos de Futebol')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('products', 'Gerenciamento de produtos')
    .addTag('orders', 'Gerenciamento de pedidos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Executar seed
  const seedService = app.get(SeedService);
  await seedService.seedProducts();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Documentação Swagger disponível em http://localhost:${port}/api/docs\n`);
}

bootstrap();
