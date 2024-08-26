import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import CreateAuthRequestCommand from './CreateAuthRequestCommand';

@fluentValidator(CreateAuthRequestCommand)
export class CreateAuthRequestCommandValidator extends Validator<CreateAuthRequestCommand> {
	constructor() {
		super();
		//TODO: add validation
		this.ruleFor('accountTypeId').notNull().withMessage(i18next.t('notEmptyaccountTypeIdText').toString());

		this.ruleFor('mobile')
			.notNull()
			.withMessage(i18next.t('notEmptymobileText').toString())
			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('onlyDigitsAreAllowed').toString());

		this.ruleFor('nationalCodeSerial')
			.notNull()
			.withMessage(i18next.t('notEmptynationalCodeSerialText').toString())
			

		this.ruleFor('nationalCode')
			.notNull()
			.withMessage(i18next.t('notEmptynationalCodeText').toString())
			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('onlyDigitsAreAllowed').toString());

		this.ruleFor('birthDate').notNull().withMessage(i18next.t('notEmptybirthDateText').toString()).minLength(10).withMessage(i18next.t("minLengthDateValidation"))

		this.ruleFor('identityIssueDate').notNull().withMessage(i18next.t('notEmptyidentityIssueDateText').toString()).minLength(10).withMessage(i18next.t("minLengthDateValidation"))
	}
}
