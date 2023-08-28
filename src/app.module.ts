import { Module } from '@nestjs/common'
import { PrismaModule } from './database/prisma.module'
import { ExpertsModule } from './experts/experts.module'
import { QueuesModule } from './queues/queues.module';

@Module({
	imports: [PrismaModule, ExpertsModule, QueuesModule],
	controllers: [],
	providers: []
})
export class AppModule {}
