import { IsNotEmpty } from 'class-validator'

export default class CreateQueueDto {
	@IsNotEmpty({ message: 'O campo expertId é obrigatório' })
	expertId: string
}
