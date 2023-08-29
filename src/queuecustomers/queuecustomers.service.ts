import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'

type CreateCustomer = {
	name: string
	service: string
	queueId: string
}

@Injectable()
export class QueuecustomersService {
	constructor(private readonly prisma: PrismaService) {}

	async addCustomer(data: CreateCustomer) {
		return await this.prisma.queueCustomer.create({ data })
	}

	async getExpertQueueToday(expertId: string) {
		return await this.prisma.queue.findFirst({
			where: {
				expertId,
				createdAt: {
					equals: new Date()
				}
			}
		})
	}

	async attendCustomer(customerId: number) {
		await this.prisma.queueCustomer.update({
			where: {
				id: customerId
			},
			data: {
				isAwaiting: false
			}
		})
	}

	async findCustomer(customerId: number) {
		return await this.prisma.queueCustomer.findFirst({
			where: {
				id: customerId
			}
		})
	}
}
