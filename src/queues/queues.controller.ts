import {
	Controller,
	Post,
	Body,
	Res,
	NotFoundException,
	BadRequestException,
	HttpStatus
} from '@nestjs/common'
import { QueuesService } from './queues.service'
import CreateQueueDto from './dtos/create-queue'
import { Response } from 'express'
import { ExpertsService } from 'src/experts/experts.service'

@Controller('queues')
export class QueuesController {
	constructor(
		private readonly queuesService: QueuesService,
		private readonly expertsService: ExpertsService
	) {}

	@Post()
	async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
		const expert = await this.expertsService.findExpert(data.expertId)

		if (!expert) {
			throw new NotFoundException('O expert não existe')
		}

		const queueExists = await this.queuesService.queueExpertsExistToday(
			data.expertId
		)

		if (queueExists) {
			throw new BadRequestException(
				'Já existe uma fila para o profissional na data atual'
			)
		}

		const queue = await this.queuesService.createQueue(data)
		return res.status(HttpStatus.CREATED).json(queue)
	}
}
