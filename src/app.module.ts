import { Module } from '@nestjs/common'
import { PrismaModule } from './database/prisma.module'
import { ExpertsModule } from './experts/experts.module'
import { QueuesModule } from './queues/queues.module'
import { QueuecustomersModule } from './queuecustomers/queuecustomers.module'

@Module({
	imports: [PrismaModule, ExpertsModule, QueuesModule, QueuecustomersModule],
	controllers: [],
	providers: []
})
export class AppModule {}
