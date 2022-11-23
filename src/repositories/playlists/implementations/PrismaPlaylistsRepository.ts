import { prisma } from "../../../config/prisma";
import { IAddToPlaylistDTO } from "../../../dtos/playlist/IAddToPlaylistDTO";
import { ICreatePlayListDTO } from "../../../dtos/playlist/ICreatePlaylistDTO";
import { PlaylistDataDTO } from "../../../dtos/playlist/PlaylistDataDTO";
import { UniquePlaylistDataDTO } from "../../../dtos/playlist/UniquePlaylistDataDTO";
import { IPlaylistsRepository } from "../IPlaylistsRepository";

class PrismaPlaylistsRepository implements IPlaylistsRepository {
    async create(data: ICreatePlayListDTO): Promise<PlaylistDataDTO> {
        const playlist = await prisma.playlist.create({
            data: {
                name: data.name,
                description: data.description,
                coverImage: data.coverImage,
                slug: data.slug,
                accountId: data.accountId
            },
            include: {
                _count: {
                    select: {
                        episodes: true
                    }
                }
            }
        })

        return playlist
    }

    async findAllByAccountId(accountId: string): Promise<PlaylistDataDTO[]> {
        const playlists = await prisma.playlist.findMany({
            where: {
                accountId
            },
            include: {
                _count: {
                    select: {
                        episodes: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return playlists
    }

    async findBySlug(slug: string): Promise<UniquePlaylistDataDTO> {
        const playlist = await prisma.playlist.findFirst({
            where: {
                slug
            },
            include: {
                episodes: {
                    select: {
                        id: true,
                        thumbnail: true,
                        title: true,
                        members: true,
                        publishedAt: true,
                        duration: true,
                        slug: true,
                        likes: {
                            select: {
                                id: true,
                                accountId: true,
                                episodeId: true,
                            }
                        }
                    },
                },
                _count: {
                    select: {
                        episodes: true
                    }
                },
            }
        })

        return playlist
    }

    async addToPlaylist(data: IAddToPlaylistDTO): Promise<PlaylistDataDTO> {
        const playlist = await prisma.playlist.update({
            where: {
                id: data.playlistId
            },
            data: {
                episodes: {
                    connect: {
                        id: data.episodeId
                    }
                }
            },
            include: {
                _count: {
                    select: {
                        episodes: true
                    }
                }
            }
        })

        return playlist
    }

    async findById(playlistId: string): Promise<PlaylistDataDTO> {
        const playlist = await prisma.playlist.findUnique({
            where: {
                id: playlistId
            },
            include: {
                _count: {
                    select: {
                        episodes: true
                    }
                }
            }
        })

        return playlist
    }
}

export { PrismaPlaylistsRepository }