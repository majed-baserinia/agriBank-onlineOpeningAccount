import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import RequestCardCommand from './RequestCardCommand';

@fluentValidator(RequestCardCommand)
export class RequestCardCommandValidator extends Validator<RequestCardCommand> {
	constructor() {
		super();
		//TODO: add validation
	}
}
