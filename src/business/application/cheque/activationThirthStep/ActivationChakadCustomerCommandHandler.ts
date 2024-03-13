import { IRequestHandler, requestHandler } from "@Mediatr/index";
import APIClient from "business/infrastructure/api-client";
import ActivationChakadCustomerRequest from "common/entities/cheque/ActivationChakadCustomerRequest";
import ActivationChakadCustomerResponse from "common/entities/cheque/ActivationChakadCustomerResponse";
import ActivationChakadCustomerCommand from "./ActivationChakadCustomerCommand";

@requestHandler(ActivationChakadCustomerCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ActivationChakadCustomerCommandHandler
  implements
    IRequestHandler<ActivationChakadCustomerCommand, ActivationChakadCustomerResponse>
{
  handle(value: ActivationChakadCustomerCommand): Promise<ActivationChakadCustomerResponse> {
    const apiClient = new APIClient<
    ActivationChakadCustomerRequest,
    ActivationChakadCustomerResponse
    >(import.meta.env.VITE_APP_SIGN_CHAKAD);
    return apiClient.post(<ActivationChakadCustomerRequest>{
      ActivationKey: value.ActivationKey
    });
  }
}
