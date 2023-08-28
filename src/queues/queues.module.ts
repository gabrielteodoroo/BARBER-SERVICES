import { Module } from '@nestjs/common'
import { QueuesService } from './queues.service'
import { QueuesController } from './queues.controller'
import { ExpertsService } from 'src/experts/experts.service'

@Module({
	controllers: [QueuesController],
	providers: [QueuesService, ExpertsService]
})
export class QueuesModule {}
