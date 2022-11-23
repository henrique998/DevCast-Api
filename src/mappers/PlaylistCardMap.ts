import { storages } from "../config/storages";
import { PlaylistDataDTO } from "../dtos/playlist/PlaylistDataDTO";

class PlaylistCardMap {
   static toDto({ id, name, coverImage, slug, createdAt, _count }: PlaylistDataDTO) {
      return {
        id,
        name,
        coverImage: coverImage ? `${storages.local_storage}/coverImage/${coverImage}` : null,
        slug,
        episodesCount: _count.episodes,
        createdAt
      }
   }
}

export { PlaylistCardMap }