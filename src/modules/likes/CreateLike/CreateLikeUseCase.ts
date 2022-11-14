import { inject, injectable } from "tsyringe"
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO"
import { AppError } from "../../../errors/AppError"
import { ILikesRepository } from "../../../repositories/likes/ILikesRepository"

interface IRequest {
    episodeId: string
    accountId: string
}

@injectable()
class CreateLikeUseCase {
    constructor(
        @inject("PrismaLikesRepository")
        private likesRepository: ILikesRepository
    ) {}

    async execute({ episodeId, accountId }: IRequest): Promise<LikeDataDTO> {
        if (!episodeId) {
            throw new AppError("episode id is required!")
        }

        if (!accountId) {
            throw new AppError("account id is required!")
        }
        
        const like = await this.likesRepository.create({
            episodeId,
            accountId
        })

        return like
    }
}

export { CreateLikeUseCase }