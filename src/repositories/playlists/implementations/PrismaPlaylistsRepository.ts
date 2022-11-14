import { prisma } from "../../../config/prisma";
import { ICreatePlayListDTO } from "../../../dtos/playlist/ICreatePlaylistDTO";
import { PlaylistDataDTO } from "../../../dtos/playlist/PlaylistDataDTO";
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
}

export { PrismaPlaylistsRepository }