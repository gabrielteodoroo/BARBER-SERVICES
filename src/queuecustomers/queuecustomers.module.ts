import { Module } from '@nestjs/common';
import { QueuecustomersService } from './queuecustomers.service';
import { QueuecustomersController } from './queuecustomers.controller';

@Module({
  controllers: [QueuecustomersController],
  providers: [QueuecustomersService],
})
export class QueuecustomersModule {}
