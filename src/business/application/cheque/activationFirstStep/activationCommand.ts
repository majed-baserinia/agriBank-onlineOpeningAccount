import { IRequest } from "@Mediatr/index";
import ActivationResponse from "common/entities/cheque/activationResponse";

export default class ActivationCommand implements IRequest<ActivationResponse> {
  SourceCard: string;
  destinationAccount: string;
  amount: string;

  constructor(AccountChargeInquiryCommand: ActivationCommand) {
    this.SourceCard = AccountChargeInquiryCommand?.SourceCard;
    this.destinationAccount = AccountChargeInquiryCommand?.destinationAccount;
    this.amount = AccountChargeInquiryCommand?.amount;
  }
}
