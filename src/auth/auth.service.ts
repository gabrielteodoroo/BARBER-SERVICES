import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user: any = await this.usersService.findUserByEmail(email)

		if (!user) {
			return null
		}

		const validPass = await bcrypt.compare(pass, user.password)

		if (!validPass) {
			return null
		}
		return user
	}
}
