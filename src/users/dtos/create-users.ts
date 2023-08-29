import { IsEmail, IsNotEmpty } from 'class-validator'

export default class CreateUsersDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	name: string

	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	@IsEmail({}, { message: 'O campo precisa ter um formato de e-mail válido' })
	email: string

	@IsNotEmpty({ message: 'O campo password é obrigatório' })
	password: string
}
