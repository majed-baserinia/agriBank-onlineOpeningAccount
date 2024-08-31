import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18next';
import InquiryGNAFForCardCommand from './InquiryGNAFForCardCommand';

@fluentValidator(InquiryGNAFForCardCommand)
export class InquiryGNAFForCardCommandValidator extends Validator<InquiryGNAFForCardCommand> {
	constructor() {
		super();
		this.ruleFor('postalCode').notNull().withMessage(i18next.t('notEmptypostalcodeText').toString());
	}
}
