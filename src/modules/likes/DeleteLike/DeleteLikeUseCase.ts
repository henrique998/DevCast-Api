import { inject, injectable } from "tsyringe"
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO"
import { AppError } from "../../../errors/AppError"
import { ILikesRepository } from "../../../repositories/likes/ILikesRepository"

interface IRequest {
    accountId: string
    likeId: string
}

@injectable()
class DeleteLikeUseCase {
    constructor(
        @inject("PrismaLikesRepository")
        private likesRepository: ILikesRepository
    ) {}

    async execute({ accountId, likeId }: IRequest): Promise<LikeDataDTO[]> {
        if (!likeId) {
            throw new AppError("like id is required!")
        }

        const likeExists = await this.likesRepository.findById(likeId)

        if (!likeExists) {
            throw new AppError("Like not found!", 404)
        }

        if (likeExists && likeExists.accountId !== accountId) {
            throw new AppError("Unauthorized action!")
        }

        await this.likesRepository.delete(likeId)

        const remainingLikes = await this.likesRepository.findAll()

        return remainingLikes
    }
}

export { DeleteLikeUseCase }