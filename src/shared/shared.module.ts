import { Module } from '@nestjs/common';
import { ServicesModule } from './services/services.module';
import { JwtStrategy } from './guards/jwt.startegy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ServicesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtAuthGuard, JwtStrategy],
  exports: [ServicesModule, JwtAuthGuard, JwtStrategy],
})
export class SharedModule {}
