import { Module } from '@nestjs/common'
import { ExpertsService } from './experts.service'
import { ExpertsController } from './experts.controller'

@Module({
	controllers: [ExpertsController],
	providers: [ExpertsService]
})
export class ExpertsModule {}
