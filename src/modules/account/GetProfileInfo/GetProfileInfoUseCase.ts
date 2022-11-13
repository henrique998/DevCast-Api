import { inject, injectable } from "tsyringe"
import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO"
import { AppError } from "../../../errors/AppError"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

@injectable()
class GetProfileInfoUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute(accountId: string): Promise<AccountDataDTO> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        const accountExists = await this.accountsRepository.findByAccountId(accountId)

        if (!accountExists) {
            throw new AppError("Account not found!", 404)
        }

        const accountData = AccountMap.toDto(accountExists)

        return accountData
    }
}

export { GetProfileInfoUseCase }