import { ICreateLikeDTO } from "../../dtos/likes/ICreateLikeDTO"
import { IFindByAccountAndEpisodeDTO } from "../../dtos/likes/IFindByAccountAndEpisodeDTO"
import { LikeDataDTO } from "../../dtos/likes/LikeDataDTO"

interface ILikesRepository {
    findAll(): Promise<LikeDataDTO[]>
    findById(likeId: string): Promise<LikeDataDTO>
    findByAccountIdAndEpisode(data: IFindByAccountAndEpisodeDTO): Promise<LikeDataDTO>
    create(data: ICreateLikeDTO): Promise<LikeDataDTO>
    delete(likeId: string): Promise<void>
}

export { ILikesRepository }