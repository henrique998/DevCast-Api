import url from "url"
import { inject, injectable } from "tsyringe"
import axios from "axios"

import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"
import { sign } from "jsonwebtoken"
import { authConfig } from "../../../config/auth"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountAuthTokensRepository } from "../../../repositories/accountAuthTokens/IAccountAuthTokensRepository"
import dayjs from "dayjs"

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRETS;

interface ITokenResponse {
    access_token: string
}

interface AccountData {
    id: string
    name: string;
    email: string;
    avatar_url: string;
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
class AuthenticateWithGithubUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository,
        @inject("PrismaAccountAuthTokensRepository")
        private accountAuthTokens: IAccountAuthTokensRepository
    ) {}

    async execute(github_code: string): Promise<IResponse> {
        const url = "https://github.com/login/oauth/access_token";

        const {
            data: { access_token },
        } = await axios.post<ITokenResponse>(url, null, {
            params: {
                client_id,
                client_secret,
                code: github_code,
            },
            headers: {
                Accept: "application/json",
            },
        });

        const {
            data,
        } = await axios.get<AccountData>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        });

        const { id, name, email, avatar_url } = data

        let accountExists = await this.accountsRepository.findByAccountEmail(email)

        if (!accountExists) {
            accountExists = await this.accountsRepository.create({
                name,
                email: email,
                avatarUrl: avatar_url,
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

export { AuthenticateWithGithubUseCase }