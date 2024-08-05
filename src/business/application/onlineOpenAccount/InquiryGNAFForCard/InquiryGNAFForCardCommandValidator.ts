import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import InquiryGNAFForCardCommand from './InquiryGNAFForCardCommand';

@fluentValidator(InquiryGNAFForCardCommand)
export class InquiryGNAFForCardCommandValidator extends Validator<InquiryGNAFForCardCommand> {
	constructor() {
		super();
		//TODO: add validation
	}
}
