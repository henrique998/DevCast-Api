import dayjs from "dayjs"
import { sign, verify } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"
import { authConfig } from "../../../config/auth"
import { AppError } from "../../../errors/AppError"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"

interface IPayload {
    sub: string
    email: string
}

interface IResponse {
    newToken: string
    newRefreshToken: string
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokens: IAccountAuthTokensRepository
    ) {}

    async execute(refreshToken: string): Promise<IResponse> {
        const { email, sub } = verify(refreshToken, authConfig.REFRESH_TOKEN_SECRET_KEY) as IPayload

        const accountId = sub

        const authToken = await this.accountAuthTokens.findByAccountIdAndRefreshToken(accountId, refreshToken)

        if (!authToken) {
            throw new AppError("Token not found!")
        }

        await this.accountAuthTokens.deleteById(authToken.id)

        const newToken = sign({}, authConfig.TOKEN_SECRET_KEY, {
            expiresIn: "15m",
            subject: accountId,
        })
        
        const newRefreshToken = sign({ email }, authConfig.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: "30d",
            subject: accountId
        })

        await this.accountAuthTokens.create({
            refreshToken: newRefreshToken,
            accountId: accountId,
            expiresDate: dayjs().add(30, "days").toDate(),
        })

        const authResult: IResponse = {
            newToken,
            newRefreshToken,
        } 

        return authResult
    }
}

export { RefreshTokenUseCase }