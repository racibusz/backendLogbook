import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./src/key.pem'),
    cert: fs.readFileSync('./src/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors({
    origin: ['http://localhost:4200', 'http://10.25.156.97:4200'],
  })
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

}
bootstrap();
