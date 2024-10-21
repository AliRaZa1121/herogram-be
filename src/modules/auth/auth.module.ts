import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../tokens/token.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    TokenModule,
    JwtModule.register({
      global: true,
      signOptions: {},
    }),
  ],
  exports: [AuthService],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
