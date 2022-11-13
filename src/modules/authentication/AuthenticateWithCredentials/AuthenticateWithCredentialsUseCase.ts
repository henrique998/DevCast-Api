import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"

import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"
import { sign } from "jsonwebtoken"
import { authConfig } from "../../../config/auth"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import dayjs from "dayjs"

interface IRequest {
    email: string
    password: string
}

type UserData = {
    id: string
    name: string
    email: string
    avatarUrl: string
}

interface IResponse {
    userData: UserData
    token: string
    refreshToken: string
}

@injectable()
class AuthenticateWithCredentialsUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokens: IAccountAuthTokensRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        if (!email || !password) {
            throw new AppError('missing data', 404)
        }

        const accountExists = await this.accountsRepository.findByAccountEmail(email)

        if (!accountExists) {
            throw new AppError('account not found', 404) 
        }

        const passwordMatch = await compare(password, accountExists.password)

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, authConfig.TOKEN_SECRET_KEY, {
            expiresIn: "15m",
            subject: accountExists.id,
        })

        const refreshToken = sign({ email }, authConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: "30d",
            subject: accountExists.id
        })

        await this.accountAuthTokens.create({
            refreshToken,
            accountId: accountExists.id,
            expiresDate: dayjs().add(30, "days").toDate(),
        })

        const userData = AccountMap.toDto(accountExists)

        const authResult = {
            userData,
            token,
            refreshToken
        }

        return authResult
    }
}

export { AuthenticateWithCredentialsUseCase }