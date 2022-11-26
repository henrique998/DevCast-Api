import { prisma } from "../../../config/prisma";
import { FavoriteEpisodeDataDTO } from "../../../dtos/favoriteEpisode/FavoriteEpisodeDataDTO";
import { FavoriteEpisodeSerialiazedDataDTO } from "../../../dtos/favoriteEpisode/FavoriteEpisodeSerialiazedDataDTO";
import { ICreateFavoriteEpisodeDTO } from "../../../dtos/favoriteEpisode/ICreateFavoriteEpisodeDTO";
import { IFindFavoriteEpisodeDTO } from "../../../dtos/favoriteEpisode/IFindFavoriteEpisodeDTO";
import { IFavoritesEpisodesRepository } from "../IFavoritesEpisodesRepository";

class PrismaFavoritesEpisodesRepository implements IFavoritesEpisodesRepository {
    async create(data: ICreateFavoriteEpisodeDTO): Promise<FavoriteEpisodeSerialiazedDataDTO> {
        const episode = await prisma.favorites.create({
            data: {
                episodeId: data.episodeId,
                accountId: data.accountId
            },
            select: {
                episode: {
                    select: {
                        id: true,
                        thumbnail: true,
                        title: true,
                        duration: true,
                        members: true,
                        publishedAt: true,
                        slug: true
                    }
                },
                accountId: true
            }
        })

        return episode
    }

    async findAll(accountId: string): Promise<FavoriteEpisodeSerialiazedDataDTO[]> {
        const favoritesEpisodes = await prisma.favorites.findMany({
            where: {
                accountId
            },
            select: {
                episode: {
                    select: {
                        id: true,
                        thumbnail: true,
                        title: true,
                        duration: true,
                        members: true,
                        publishedAt: true,
                        slug: true,
                        url: true
                    }
                },
                accountId: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return favoritesEpisodes
    }

    async findById(favoriteEpisodeId: string): Promise<FavoriteEpisodeDataDTO> {
        const favoriteEpisode = await prisma.favorites.findUnique({
            where: {
                id: favoriteEpisodeId
            }
        })

        return favoriteEpisode
    }

    async delete(favoriteEpisodeId: string): Promise<void> {
        await prisma.favorites.delete({
            where: {
                id: favoriteEpisodeId
            }
        })
    }

    async findByEpisodIdAndAccountId({ episodeId, accountId }: IFindFavoriteEpisodeDTO): Promise<FavoriteEpisodeDataDTO> {
        const favoriteEpisode = await prisma.favorites.findFirst({
            where: {
                episodeId,
                accountId
            }
        })

        return favoriteEpisode
    }
}

export { PrismaFavoritesEpisodesRepository }