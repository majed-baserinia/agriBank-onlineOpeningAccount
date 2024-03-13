import { IRequest } from "@Mediatr/index";
import RegisterChakadCustomerRequest from "common/entities/cheque/RegisterChakadCustomerRequest";
//VITE_APP_INITIAL_CHAKAD
export default class RegisterChakadCustomerCommand
  implements IRequest<RegisterChakadCustomerRequest>
{
  CustomerNumber: number;

  constructor(AccountChargeInquiryCommand: RegisterChakadCustomerCommand) {
    this.CustomerNumber = AccountChargeInquiryCommand?.CustomerNumber;
  }
}
