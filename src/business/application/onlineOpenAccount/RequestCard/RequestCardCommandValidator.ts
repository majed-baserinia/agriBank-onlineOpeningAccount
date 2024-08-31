import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import RequestCardCommand from './RequestCardCommand';
import i18next from 'i18next';

@fluentValidator(RequestCardCommand)
export class RequestCardCommandValidator extends Validator<RequestCardCommand> {
	constructor() {
		super();
		this.ruleFor('cityId')
			.notNull()
			.withMessage(i18next.t('notEmptyCityText').toString())
	}
}
