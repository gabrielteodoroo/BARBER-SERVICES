import {
	Controller,
	Post,
	Body,
	Res,
	NotFoundException,
	HttpStatus,
	Patch,
	Param,
	BadRequestException,
	Delete,
	UseGuards
} from '@nestjs/common'
import { QueuecustomersService } from './queuecustomers.service'
import CreateQueueCustomersDto from './dtos/create-queuecustomers'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard'

@Controller('queuecustomers')
export class QueuecustomersController {
	constructor(private readonly queuecustomersService: QueuecustomersService) {}

	@Post()
	async addCustomer(
		@Body() data: CreateQueueCustomersDto,
		@Res() res: Response
	) {
		const queueExists = await this.queuecustomersService.getExpertQueueToday(
			data.expertId
		)

		if (!queueExists) {
			throw new NotFoundException('A fila não existe')
		}

		const customer = await this.queuecustomersService.addCustomer({
			name: data.name,
			service: data.service,
			queueId: queueExists.id
		})

		return res.status(HttpStatus.CREATED).json(customer)
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async attendCustomer(@Param('id') id: string, @Res() res: Response) {
		const customer = await this.queuecustomersService.findCustomer(+id)

		if (!customer) {
			throw new NotFoundException('O cliente não existe')
		}

		if (!customer.isAwaiting) {
			throw new BadRequestException('O cliente já foi atendido')
		}

		await this.queuecustomersService.attendCustomer(customer.id)

		return res.status(HttpStatus.NO_CONTENT).send()
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteCustomer(@Param('id') id: string, @Res() res: Response) {
		const customer = await this.queuecustomersService.findCustomer(+id)

		if (!customer) {
			throw new NotFoundException('O cliente não existe')
		}

		await this.queuecustomersService.deleteCustomer(customer.id)
		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
