import fluentValidator from "@Fluentvalidator/attributes/validate.attribute";
import { Validator } from "@Fluentvalidator/index";
import RegisterChakadCustomerCommand from "./RegisterChakadCustomerCommand";

@fluentValidator(RegisterChakadCustomerCommand)
export class RegisterChakadCustomerCommandValidator extends Validator<RegisterChakadCustomerCommand> {
  constructor() {
    super();
  }
}
