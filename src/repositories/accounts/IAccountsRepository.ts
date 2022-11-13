import { AccountDataDTO } from "../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../dtos/account/ICreateAccountDTO";

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<AccountDataDTO>;
    findByAccountId(accountId: string): Promise<AccountDataDTO>;
    findByAccountEmail(email: string): Promise<AccountDataDTO>;
    getLastFour(): Promise<AccountDataDTO[]>;
}

export { IAccountsRepository };
