import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import VerificationOTPCommand from './VerificationOTPCommand';

@fluentValidator(VerificationOTPCommand)
export class VerificationOTPCommandValidator extends Validator<VerificationOTPCommand> {
	constructor() {
		super();

		this.ruleFor('verifyCode')
			.notNull()
			.withMessage(i18next.t('notEmptyVeryfyCodeText').toString())

			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('onlyDigitsAreAllowed').toString());
	}
}
