import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import CheckInfoFormValidatorCommand from './CheckInfoFormValidatorCommand';

@fluentValidator(CheckInfoFormValidatorCommand)
export class CheckInfoFormValidatorCommandValidator extends Validator<CheckInfoFormValidatorCommand> {
	constructor() {
		super();

		this.ruleFor('checkAmount')
			.notNull()
			.withMessage(i18next.t('notEmptyCheckAmountText').toString())

			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('ONLY_DIGITS_ARE_ALLOWED').toString());

		this.ruleFor('date').notNull().withMessage(i18next.t('DATE_MUST_HAVE_A_VALUE').toString());

		this.ruleFor('description').notNull().withMessage(i18next.t('description_MUST_HAVE_A_VALUE').toString());

		this.ruleFor('reason').notNull().withMessage(i18next.t('reason_MUST_HAVE_A_VALUE').toString());
	}
}
