import { inject, injectable } from "tsyringe"
import { AppError } from "../../../errors/AppError"
import { INewsletterRepository } from "../../../repositories/newsletter/INewsletterRepository"

@injectable()
class RegisterEmailUseCase {
    constructor(
        @inject("PrismaNewsletterRepository")
        private newsletterRepository: INewsletterRepository
    ) {}

    async execute(email: string): Promise<void> {
        if (!email) {
            throw new AppError("E-mail is required!")
        }

        const emailAlreadyRegistered = await this.newsletterRepository.findByEmail(email)

        if (emailAlreadyRegistered) {
            throw new AppError("E-mail already registered!")
        }

        await this.newsletterRepository.create(email)
    }  
}

export { RegisterEmailUseCase }