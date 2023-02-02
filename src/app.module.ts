import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule, Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    CacheModule.register({ ttl: 900000 }),
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
