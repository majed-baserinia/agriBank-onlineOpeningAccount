import { IRequestHandler, requestHandler } from "@Mediatr/index";
import APIClient from "business/infrastructure/api-client";
import SignChakadCustomerCommandRequest from "common/entities/cheque/SignChakadCustomerRequest";
import SignChakadCustomerCommandResponse from "common/entities/cheque/SignChakadCustomerResponse";
import SignChakadCustomerCommand from "./SignChakadCustomerCommand";

@requestHandler(SignChakadCustomerCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AccountChargeharimCommandHandler
  implements
    IRequestHandler<SignChakadCustomerCommand, SignChakadCustomerCommandResponse>
{
  handle(value: SignChakadCustomerCommand): Promise<SignChakadCustomerCommandResponse> {
    const apiClient = new APIClient<
      SignChakadCustomerCommandRequest,
      SignChakadCustomerCommandResponse
    >(import.meta.env.VITE_APP_SIGN_CHAKAD);
    return apiClient.post(<SignChakadCustomerCommandRequest>{
      ActivationKey: value.ActivationKey
    });
  }
}
