import { AccountDataDTO } from "../dtos/account/AccountDataDTO";

class AccountMap {
    static toDto({ id, name, email, avatarUrl, discordId }: AccountDataDTO) {
        return {
            id,
            name,
            email,
            avatarUrl: discordId ? avatarUrl : `http://localhost:333/images/${avatarUrl}`
        }
    }
}

export { AccountMap }