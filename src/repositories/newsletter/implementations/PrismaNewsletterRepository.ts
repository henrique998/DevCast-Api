import { prisma } from "../../../config/prisma";
import { NewsletterDataDTO } from "../../../dtos/newsletter/NewsletterDataDTO";
import { INewsletterRepository } from "../INewsletterRepository";

class PrismaNewsletterRepository implements INewsletterRepository {
    async findByEmail(email: string): Promise<NewsletterDataDTO> {
        const result = await prisma.newsletter.findFirst({
            where: {
                email
            }
        })

        return result
    }

    async create(email: string): Promise<void> {
        await prisma.newsletter.create({
            data: {
                email
            }
        })
    }
}

export { PrismaNewsletterRepository }