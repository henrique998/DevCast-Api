import { ICreateLikeDTO } from "../../dtos/likes/ICreateLikeDTO"
import { LikeDataDTO } from "../../dtos/likes/LikeDataDTO"

interface ILikesRepository {
    findAll(): Promise<LikeDataDTO[]>
    findById(likeId: string): Promise<LikeDataDTO>
    create(data: ICreateLikeDTO): Promise<LikeDataDTO>
    delete(likeId: string): Promise<void>
}

export { ILikesRepository }