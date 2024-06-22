import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import RejectGivebackChequeInitiateCommand from './RejectGivebackChequeInitiateCommand';

@fluentValidator(RejectGivebackChequeInitiateCommand)
export class RejectGivebackChequeInitiateCommandValidator extends Validator<RejectGivebackChequeInitiateCommand> {
	constructor() {
		super();

		this.ruleFor('description')
			.notNull()
			.withMessage(i18next.t('description_MUST_HAVE_A_VALUE').toString())
			.notEmpty()
			.withMessage(i18next.t('description_MUST_HAVE_A_VALUE').toString())
			.maxLength(250)
			.withMessage(i18next.t('maxlengthdescription').toString());
	}
}
