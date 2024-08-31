import fluentValidator from '@Fluentvalidator/attributes/validate.attribute';
import { Validator } from '@Fluentvalidator/index';
import i18next from 'i18n';
import SaveAddressCommand from './SaveAddressCommand';

@fluentValidator(SaveAddressCommand)
export class SaveAddressCommandValidator extends Validator<SaveAddressCommand> {
	constructor() {
		super();
		this.ruleFor('provinceId').notNull().withMessage(i18next.t('notEmptyVeryfyCodeText').toString());
		this.ruleFor('cityId').notNull().withMessage(i18next.t('notEmptyCityText').toString());
		this.ruleFor('alley').notNull().withMessage(i18next.t('notEmptyAlleyText').toString());
		this.ruleFor('branchCode').notNull().withMessage(i18next.t('notEmptybranchCodeText').toString());
		this.ruleFor('jobDetailId').notNull().withMessage(i18next.t('notEmptyJobText').toString());
		this.ruleFor('mainStreet').notNull().withMessage(i18next.t('notEmptymainStreetText').toString());
		this.ruleFor('postalCode').notNull().withMessage(i18next.t('notEmptypostalcodeText').toString());
		this.ruleFor('village').notNull().withMessage(i18next.t('notEmptyVillageText').toString());
		this.ruleFor('phone')
			.notNull()
			.withMessage(i18next.t('notEmptyPhoneText').toString())
			.minLength(8)
			.withMessage(i18next.t('minLengthPhoneValidation'));
	}
}
