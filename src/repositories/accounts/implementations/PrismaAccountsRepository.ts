import { prisma } from "../../../config/prisma"
import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO"
import { ICreateAccountDTO } from "../../../dtos/account/ICreateAccountDTO"
import { IAccountsRepository } from "../IAccountsRepository"

class PrismaAccountsRepository implements IAccountsRepository {
    async create(data: ICreateAccountDTO): Promise<AccountDataDTO> {
        const user = await prisma.account.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                avatarUrl: data.avatarUrl,
                discordId: data.discordId
            }
        })

        return user
    }

    async findByAccountId(accountId: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findUnique({
            where: {
                id: accountId, 
            }
        })

        return account
    }

    async findByAccountEmail(email: string): Promise<AccountDataDTO> {
        const account = await prisma.account.findUnique({
            where: {
                email
            }
        })

        return account
    }

    async getLastFour(): Promise<AccountDataDTO[]> {
        const accountsQty = await prisma.account.findMany({
            take: 4,
            orderBy: {
                createdAt: "desc"
            }
        })

        return accountsQty
    }
}

export { PrismaAccountsRepository }
