import { storages } from "../config/storages";
import { PlaylistDataDTO } from "../dtos/playlist/PlaylistDataDTO";

class PlaylistMap {
   static toDto({ id, name, coverImage, description, slug, createdAt, _count }: PlaylistDataDTO) {
      return {
        id,
        name,
        coverImage: `${storages.local_storage}/coverImage/${coverImage}`,
        description,
        slug,
        episodesCount: _count.episodes,
        createdAt
      }
   }
}

export { PlaylistMap }