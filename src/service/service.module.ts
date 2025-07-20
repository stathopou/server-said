import { Module } from '@nestjs/common';
import { MessageRouterService } from './message-router/message-router.service';

@Module({
  providers: [MessageRouterService]
})
export class ServiceModule {}
