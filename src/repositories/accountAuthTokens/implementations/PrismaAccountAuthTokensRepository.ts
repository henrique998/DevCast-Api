import { prisma } from "../../../config/prisma";
import { AccountAuthTokenDataDTO } from "../../../dtos/accountAuthToken/AccountAuthTokenDataDTO";
import { ICreateAccountAuthTokenDTO } from "../../../dtos/accountAuthToken/ICreateAccountAuthTokenDTO";
import { IAccountAuthTokensRepository } from "../IAccountAuthTokensRepository";

class PrismaAccountAuthTokensRepository implements IAccountAuthTokensRepository {
    async create(data: ICreateAccountAuthTokenDTO): Promise<void> {
        const accountAuthToken = await prisma.accountAuthToken.create({
            data: {
                refreshToken: data.refreshToken,
                accountId: data.accountId,
                expiresDate: data.expiresDate
            }
        })
    }

    async findByAccountIdAndRefreshToken(accountId: string, refreshToken: string): Promise<AccountAuthTokenDataDTO> {
        const accountAuthToken = await prisma.accountAuthToken.findFirst({
            where: {
                accountId,
                refreshToken
            }
        }) 

        return accountAuthToken
    }

    async deleteById(id: string): Promise<void> {
        await prisma.accountAuthToken.delete({
            where: {
                id,
            }
        })
    }
}

export { PrismaAccountAuthTokensRepository }