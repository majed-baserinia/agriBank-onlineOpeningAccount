export type SaveNationalCodeImageResponse = {
	orderId: string;
	kycUrl: string; //مشخص میکند آدرس شرکت احراز هویت کننده چیست ؟
	isKYCNeeded: boolean; //مشخص میکند که این افتتاح حساب اصلا نیازی به احراز هویت دارد یا خیر؟
};
