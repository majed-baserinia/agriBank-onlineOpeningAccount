import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import AddReceiversformValidationCommand from './AddReceiversformValidationCommand';

@fluentValidator(AddReceiversformValidationCommand)
export class AddReceiversformValidationCommandValidator extends Validator<AddReceiversformValidationCommand> {
	constructor() {
		super();

		this.ruleFor('name').notEmpty().withMessage(i18next.t('notEmptyRecieverNameText').toString());

		this.ruleFor('nationalNo')
			.notEmpty()
			.withMessage(i18next.t('nationalNo_MUST_HAVE_A_VALUE').toString())
			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('ONLY_DIGITS_ARE_ALLOWED').toString())
			.maxLength(13)
			.withMessage(i18next.t('IdmaxLengthErrorText').toString());
	}
}
