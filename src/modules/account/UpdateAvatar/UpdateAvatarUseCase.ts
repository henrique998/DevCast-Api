import { inject, injectable } from "tsyringe"
import { storages } from "../../../config/storages"
import { AppError } from "../../../errors/AppError"

import { IAccountsRepository } from "../../../repositories/accounts/IAccountsRepository"

interface IRequest {
    accountId: string
    avatarUrl: string 
}

@injectable()
class UpdateAvatarUseCase {
    constructor(
        @inject("PrismaAccountsRepository")
        private accountsRepository: IAccountsRepository
    ) {}

    async execute({ accountId, avatarUrl }: IRequest): Promise<string> {
        if (!avatarUrl) {
            throw new AppError("Avatar file is required!")
        }

        const account = await this.accountsRepository.updateAvatar({
            accountId,
            avatarUrl
        })

        const newAvatarUrl = `${storages.local_storage}/avatar/${account.avatarUrl}`

        return newAvatarUrl
    }
}

export { UpdateAvatarUseCase }