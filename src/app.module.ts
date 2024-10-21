import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './app/mail/mail.module';
import { QueueModule } from './app/queue/queue.module';
import { RedisModule } from './app/cache/redis.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HttpExceptionFilter } from './core/exceptions/http.exception';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { TokenModule } from './modules/tokens/token.module';
import { join } from 'path';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
      cache: true,
      load: [],
      envFilePath: `${process.env.NODE_ENV}.env`, // loading NODE_ENV from package.json scripts
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    RedisModule,
    QueueModule,
    DatabaseModule,
    MailModule,
    MediaModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
