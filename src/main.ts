import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'DevTeam_Secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 86400000, // 1 day
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
