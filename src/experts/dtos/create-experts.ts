import { IsNotEmpty, IsEmail } from 'class-validator'

export default class CreateExpertsDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	name: string

	@IsNotEmpty({ message: 'O campo email é obrigatório' })
	@IsEmail({}, { message: 'O campo precisa ter um formato de email válido' })
	email: string

	phone: string
}
