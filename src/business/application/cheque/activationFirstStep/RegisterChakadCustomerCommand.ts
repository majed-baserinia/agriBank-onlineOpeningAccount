import { IRequest } from "@Mediatr/index";
import RegisterChakadCustomerResponse from "common/entities/cheque/RegisterChakadCustomerResponse";
//VITE_APP_INITIAL_CHAKAD
export default class RegisterChakadCustomerCommand
  implements IRequest<RegisterChakadCustomerResponse>
{
  CustomerNumber: number;

  constructor(RegisterChakadCustomerCommand: RegisterChakadCustomerCommand) {
    this.CustomerNumber = RegisterChakadCustomerCommand?.CustomerNumber;
  }
}
