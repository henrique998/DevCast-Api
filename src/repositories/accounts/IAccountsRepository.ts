import { AccountDataDTO } from "../../dtos/account/AccountDataDTO";
import { ICreateAccountDTO } from "../../dtos/account/ICreateAccountDTO";
import { IUpdateAccountDTO } from "../../dtos/account/IUpdateAccountDTO";

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<AccountDataDTO>;
    findByAccountId(accountId: string): Promise<AccountDataDTO>;
    findByAccountEmail(email: string): Promise<AccountDataDTO>;
    getLastFour(): Promise<AccountDataDTO[]>;
    update(data: IUpdateAccountDTO): Promise<void>;
}

export { IAccountsRepository };
