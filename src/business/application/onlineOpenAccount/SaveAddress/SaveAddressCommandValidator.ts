import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import SaveAddressCommand from './SaveAddressCommand';

@fluentValidator(SaveAddressCommand)
export class SaveAddressCommandValidator extends Validator<SaveAddressCommand> {
	constructor() {
		super();
// TODO: Add more rules here
		this.ruleFor('provinceId')
			.notNull()
			.withMessage(i18next.t('notEmptyVeryfyCodeText').toString())

	}
}
