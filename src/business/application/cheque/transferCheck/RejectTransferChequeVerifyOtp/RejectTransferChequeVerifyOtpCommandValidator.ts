import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import RejectTransferChequeVerifyOtpCommand from './RejectTransferChequeVerifyOtpCommand';

@fluentValidator(RejectTransferChequeVerifyOtpCommand)
export class RejectTransferChequeVerifyOtpCommandValidator extends Validator<RejectTransferChequeVerifyOtpCommand> {
	constructor() {
		super();

		this.ruleFor('otpCode')
			.notNull()
			.withMessage(i18next.t('notEmptyActivationCodeText').toString())

			.matches(new RegExp('^[0-9]+$'))
			.withMessage(i18next.t('ONLY_DIGITS_ARE_ALLOWED').toString());
	}
}
