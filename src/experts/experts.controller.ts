import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common'
import { ExpertsService } from './experts.service'
import CreateExpertsDto from './dtos/create-experts'
import { Response } from 'express'
import UpdateExpertsDto from './dtos/update-experts'

@Controller('experts')
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@Post()
	async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
		const expertExists = await this.expertsService.findExpertByEmail(data.email)

		if (expertExists) {
			throw new BadRequestException(
				'Já existe um profissional com o email informado'
			)
		}

		const expert = await this.expertsService.createExpert(data)
		return res.status(HttpStatus.CREATED).json(expert)
	}

	@Get()
	async getExperts(@Res() res: Response) {
		const experts = await this.expertsService.findAllExperts()
		return res.json(experts)
	}

	@Get(':id')
	async getExpert(@Res() res: Response, @Param('id') id: string) {
		const expert = await this.expertsService.findExpert(id)

		if (!expert) {
			throw new NotFoundException('Profissional não encontrado')
		}

		return res.json(expert)
	}

	@Patch(':id')
	async updateExpert(
		@Param('id') id: string,
		@Body() data: UpdateExpertsDto,
		@Res() res: Response
	) {
		const expert = await this.expertsService.findExpert(id)

		if (!expert) {
			throw new NotFoundException('Profissional não encontrado')
		}

		if (data.email) {
			const emailExists = await this.expertsService.findExpertByEmail(
				data.email
			)

			if (emailExists && emailExists.email !== expert.email) {
				throw new BadRequestException(
					'Já existe um outro profissional com o email informado'
				)
			}
		}
		await this.expertsService.updateExpert(id, { ...expert, ...data })
		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
