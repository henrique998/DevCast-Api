import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

@injectable()
class DeleteAvatarUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute(accountId: string): Promise<void> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        await this.accountsRepository.deleteAvatar(accountId)
    }
}

export { DeleteAvatarUseCase }