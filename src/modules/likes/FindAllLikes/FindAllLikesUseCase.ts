import { inject, injectable } from "tsyringe"
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO"
import { ILikesRepository } from "../../../repositories/likes/ILikesRepository"

@injectable()
class FindAllLikesUseCase {
    constructor(
        @inject("PrismaLikesRepository")
        private likesRepository: ILikesRepository
    ) {}

    async execute(): Promise<LikeDataDTO[]> {
        const likes = await this.likesRepository.findAll()

        return likes
    }
}

export { FindAllLikesUseCase }