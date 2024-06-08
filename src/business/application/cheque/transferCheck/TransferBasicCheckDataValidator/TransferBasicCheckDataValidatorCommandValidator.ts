import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import TransferBasicCheckDataValidatorCommand from './TransferBasicCheckDataValidatorCommand';

@fluentValidator(TransferBasicCheckDataValidatorCommand)
export class TransferBasicCheckDataValidatorCommandValidator extends Validator<TransferBasicCheckDataValidatorCommand> {
	constructor() {
		super();

		this.ruleFor('description')
			.notNull()
			.withMessage(i18next.t('description_MUST_HAVE_A_VALUE').toString())
			.maxLength(250)
			.withMessage(i18next.t('maxlengthdescription').toString());

		this.ruleFor('reason').notNull().withMessage(i18next.t('reason_MUST_HAVE_A_VALUE').toString());
	}
}
