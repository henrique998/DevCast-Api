import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    accountId: string
    name?: string
    email?: string
}    

interface IResponse {
    name: string
    email: string
}

@injectable()
class UpdateAccountUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ accountId, email, name }: IRequest): Promise<IResponse> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const accountExists = await this.accountsRepository.findByAccountId(accountId)

        if (!accountExists) {
            throw new AppError("Account not found!")
        }

        if (accountExists && accountExists.id !== accountId) {
            throw new AppError("Unauthorized action!")
        }

        const accountData = await this.accountsRepository.update({
            accountId,
            name,
            email
        })

        const account = {
            name: accountData.name,
            email: accountData.email
        }

        return account
    }
}

export { UpdateAccountUseCase }