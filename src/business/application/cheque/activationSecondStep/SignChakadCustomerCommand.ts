import { IRequest } from "@Mediatr/index";
import SignChakadCustomerRequest from "common/entities/cheque/SignChakadCustomerRequest";
//VITE_APP_INITIAL_CHAKAD
export default class SignChakadCustomerCommand
  implements IRequest<SignChakadCustomerRequest>
{
  ActivationKey : string;

  constructor(SignChakadCustomerCommand: SignChakadCustomerCommand) {
    this.ActivationKey  = SignChakadCustomerCommand?.ActivationKey ;
  }
}
