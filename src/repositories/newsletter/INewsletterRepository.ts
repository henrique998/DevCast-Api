import { NewsletterDataDTO } from "../../dtos/newsletter/NewsletterDataDTO"

interface INewsletterRepository {
    findByEmail(email: string): Promise<NewsletterDataDTO>
    create(email: string): Promise<void>
}

export { INewsletterRepository }