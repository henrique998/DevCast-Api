import { inject, injectable } from "tsyringe"
import slugify from "slugify"

import { AppError } from "../../../errors/AppError"
import { IPlaylistsRepository } from "../../../repositories/playlists/IPlaylistsRepository"
import { PlaylistMap } from "../../../mappers/PlaylistMap"

interface IRequest {
    accountId: string
    name: string
    description?: string
    coverImage?: string
}

@injectable()
class CreatePlaylistUseCase {
    constructor(
        @inject("PrismaPlaylistsRepository")
        private playlistsRepository: IPlaylistsRepository
    ) {}

    async execute({ accountId, name, coverImage, description }: IRequest): Promise<any> {
        if (!accountId) {
            throw new AppError("account id is required!")
        }

        if (!name) {
            throw new AppError("name is required!")
        }

        const slug = slugify(name, {
            lower: true
        })

        const data = await this.playlistsRepository.create({
            accountId,
            name,
            description,
            coverImage,
            slug
        })

        const playlist = PlaylistMap.toDto(data)

        return playlist
    }
}

export { CreatePlaylistUseCase }