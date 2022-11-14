import { prisma } from "../../../config/prisma";
import { EpisodeDataDTO } from "../../../dtos/episode/EpisodeDataDTO";
import { ICreateEpisodeDTO } from "../../../dtos/episode/ICreateEpisodeDTO";
import { IEpisodesRepository } from "../IEpisodesRepository";

class PrismaEpisodesRepository implements IEpisodesRepository {
    async create(data: ICreateEpisodeDTO): Promise<EpisodeDataDTO> {
        const episode = await prisma.episode.create({
            data: {
                thumbnail: data.thumbnail,
                title: data.title,
                members: data.members,
                description: data.description,
                slug: data.slug,
                url: data.url,
                type: data.type,
                duration: data.duration,
                publishedAt: data.publishedAt,
            }
        })

        return episode
    }

    async findAll(): Promise<EpisodeDataDTO[]> {
        const episodes = await prisma.episode.findMany()

        return episodes
    }

    async findBySlug(slug: string): Promise<EpisodeDataDTO> {
        const episode = await prisma.episode.findFirst({
            where: {
                slug
            },
            include: {
                _count: {
                    select: {
                        likes: true
                    }
                }
            }
        })

        return episode
    }
}

export { PrismaEpisodesRepository }