import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { of } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  getHello(): any {
    return this.appService.exportMiningPower();
  }

  @Get('/ping')
  @UseInterceptors(CacheInterceptor)
  getPing(): any {
    return of('pong')
  }
}
