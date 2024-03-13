import fluentValidator from "@Fluentvalidator/attributes/validate.attribute";
import { Validator } from "@Fluentvalidator/index";
import i18next from "i18n";
import RegisterChakadCustomerCommand from "./RegisterChakadCustomerCommand";

@fluentValidator(RegisterChakadCustomerCommand)
export class RegisterChakadCustomerCommandValidator extends Validator<RegisterChakadCustomerCommand> {
  constructor() {
    super();

    this.ruleFor("CustomerNumber")
      // .notNull()
      // .withMessage(i18next.t("EXPIRATION_DATE_MUST_HAVE_A_VALUE").toString())
      .notNull()
      .withMessage(i18next.t("EXPIRATION_DATE_MUST_HAVE_A_VALUE").toString());
  }
}
