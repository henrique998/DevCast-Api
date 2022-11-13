import { inject, injectable } from "tsyringe"
import { AccountDataDTO } from "../../../dtos/account/AccountDataDTO"
import { AccountMap } from "../../../mappers/AccountMap"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

@injectable()
class GetLastFourAccountsUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute(): Promise<AccountDataDTO[]> {
        const response = await this.accountsRepository.getLastFour()

        const lastFourAccounts = response.map(account => AccountMap.toDto(account))

        return lastFourAccounts
    }
}

export { GetLastFourAccountsUseCase }