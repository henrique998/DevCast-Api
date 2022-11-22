import { storages } from "../config/storages";
import { AccountDataDTO } from "../dtos/account/AccountDataDTO";

class AccountMap {
    static toDto({ id, name, email, avatarUrl }: AccountDataDTO) {
        const githubAvatarExists = avatarUrl?.startsWith("https://avatars.githubusercontent") ?? ""

        return {
            id,
            name,
            email,
            avatarUrl: githubAvatarExists ? avatarUrl : (avatarUrl !== null ? `${storages.local_storage}/avatar/${avatarUrl}` : null)
        }
    }
}

export { AccountMap }