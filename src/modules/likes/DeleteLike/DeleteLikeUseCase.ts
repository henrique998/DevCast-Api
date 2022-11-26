import { inject, injectable } from "tsyringe"
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO"
import { AppError } from "../../../errors/AppError"
import { ILikesRepository } from "../../../repositories/likes/ILikesRepository"

interface IRequest {
    accountId: string
    episodeId: string
}

@injectable()
class DeleteLikeUseCase {
    constructor(
        @inject("PrismaLikesRepository")
        private likesRepository: ILikesRepository
    ) {}

    async execute({ accountId, episodeId }: IRequest): Promise<void> {
        const likeExists = await this.likesRepository.findByAccountIdAndEpisode({
            accountId,
            episodeId
        })

        if (!likeExists) {
            throw new AppError("Like not found!", 404)
        }

        await this.likesRepository.delete(likeExists.id)
    }
}

export { DeleteLikeUseCase }