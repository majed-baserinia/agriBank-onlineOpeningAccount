import { IRequest } from '@Mediatr/index';
import CurrentAccount from 'common/entities/AccountResponse';

export default class CurrentAccountsQuery implements IRequest<CurrentAccount[]> {}
