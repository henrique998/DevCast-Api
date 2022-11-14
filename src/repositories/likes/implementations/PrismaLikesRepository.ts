import { prisma } from "../../../config/prisma";
import { ICreateLikeDTO } from "../../../dtos/likes/ICreateLikeDTO";
import { LikeDataDTO } from "../../../dtos/likes/LikeDataDTO";
import { ILikesRepository } from "../ILikesRepository";

class PrismaLikesRepository implements ILikesRepository {
    async findAll(): Promise<LikeDataDTO[]> {
        const likes = await prisma.like.findMany()

        return likes
    }

    async findById(likeId: string): Promise<LikeDataDTO> {
        const like = await prisma.like.findUnique({
            where: {
                id: likeId
            }
        })

        return like
    }

    async create(data: ICreateLikeDTO): Promise<LikeDataDTO> {
        const like = await prisma.like.create({
            data: {
                accountId: data.accountId,
                episodeId: data.episodeId
            }
        })

        return like
    }

    async delete(likeId: string): Promise<void> {
        await prisma.like.delete({
            where: {
                id: likeId
            }
        })
    }
}

export { PrismaLikesRepository }