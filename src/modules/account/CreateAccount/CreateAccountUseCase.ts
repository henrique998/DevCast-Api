import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"

import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    name: string
    email: string
    password: string
}

@injectable()
class CreateAccountUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ name, email, password }: IRequest): Promise<void> {
        if (!name) {
            throw new AppError("first name is required!")
        }

        if (!email) {
            throw new AppError("email is required!")
        }

        const userAlreadyExists = await this.accountsRepository.findByAccountEmail(email)

        if (userAlreadyExists) {
            throw new AppError('user already exists!')
        }

        if (!password) {
            throw new AppError("password is required!")
        }

        const hashedPassword = await hash(password, 8)

        await this.accountsRepository.create({
            name,
            email,
            password: hashedPassword,
        })
    }
}

export { CreateAccountUseCase }
