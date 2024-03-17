import { IRequest } from "@Mediatr/index";
import RegisterChakadCustomerResponse from "common/entities/cheque/activation/firstStep/FirstStepResponse";
//VITE_APP_INITIAL_CHAKAD
export default class FirstStepCommand
  implements IRequest<RegisterChakadCustomerResponse>
{
  CustomerNumber: number;

  constructor(FirstStepCommand: FirstStepCommand) {
    this.CustomerNumber = FirstStepCommand?.CustomerNumber;
  }
}
