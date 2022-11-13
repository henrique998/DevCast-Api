import url from "url"
import { inject, injectable } from "tsyringe"
import axios from "axios"

import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"
import { sign } from "jsonwebtoken"
import { authConfig } from "../../../config/auth"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import dayjs from "dayjs"

interface ITokenResponse {
    access_token: string
}

interface AccountData {
    id: string
    username: string
    email: string
    avatar: string
}

interface IResponse {
    token: string
    refreshToken: string
    accountData: {
        id: string
        name: string
        email: string
        avatarUrl: string
    } 
}

@injectable()
class AuthenticateWithDiscordUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokens: IAccountAuthTokensRepository
    ) {}

    async execute(discord_code: string): Promise<IResponse> {
        const discordApiTokenUrl = "https://discord.com/api/v10/oauth2/token"

        const formData = new url.URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: discord_code,
            redirect_uri: "http://localhost:3333/discord/redirect",
        })

        const {
            data: { access_token },
        } = await axios.post<ITokenResponse>(discordApiTokenUrl, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })

        const {
            data,
        } = await axios.get<AccountData>("https://discord.com/api/v8/users/@me", {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        })

        const { id, username, email, avatar } = data

        let accountExists = await this.accountsRepository.findByAccountEmail(email)

        if (!accountExists) {
            accountExists = await this.accountsRepository.create({
                name: username,
                email: email,
                avatarUrl: avatar,
                discordId: id
            })
        }

        const token = sign({}, authConfig.TOKEN_SECRET_KEY, {
            expiresIn: "1d",
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

        const accountData = AccountMap.toDto(accountExists)

        const authResult: IResponse = {
            token,
            refreshToken,
            accountData
        }

        return authResult
    }
}

export { AuthenticateWithDiscordUseCase }