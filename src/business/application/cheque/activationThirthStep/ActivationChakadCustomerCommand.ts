import { IRequest } from "@Mediatr/index";
import ActivationChakadCustomerRequest from "common/entities/cheque/SignChakadCustomerRequest";
//VITE_APP_INITIAL_CHAKAD
export default class ActivationChakadCustomerCommand
  implements IRequest<ActivationChakadCustomerRequest>
{
  ActivationKey : string;

  constructor(ActivationChakadCustomerCommand: ActivationChakadCustomerCommand) {
    this.ActivationKey  = ActivationChakadCustomerCommand?.ActivationKey ;
  }
}
