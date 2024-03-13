import fluentValidator from "@Fluentvalidator/attributes/validate.attribute";
import { Validator } from "@Fluentvalidator/index";
import i18next from "i18n";
import ActivationChakadCustomerCommand from "./ActivationChakadCustomerCommand";

@fluentValidator(ActivationChakadCustomerCommand)
export class ActivationChakadCustomerCommandValidator extends Validator<ActivationChakadCustomerCommand> {
  constructor() {
    super();

    this.ruleFor("ActivationKey")
      // .notNull()
      // .withMessage(i18next.t("EXPIRATION_DATE_MUST_HAVE_A_VALUE").toString())
      .notNull()
      .withMessage(i18next.t("EXPIRATION_DATE_MUST_HAVE_A_VALUE").toString());
  }
}
