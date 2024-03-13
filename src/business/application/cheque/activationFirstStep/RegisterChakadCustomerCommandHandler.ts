import { IRequestHandler, requestHandler } from "@Mediatr/index";
import APIClient from "business/infrastructure/api-client";
import RegisterChakadCustomerResponse from "common/entities/cheque/RegisterChakadCustomerResponse";
import registerchakadcustomerRequest from "common/entities/cheque/RegisterChakadCustomerRequest";
import RegisterChakadCustomerCommand from "./RegisterChakadCustomerCommand";

@requestHandler(RegisterChakadCustomerCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AccountChargeharimCommandHandler
  implements
    IRequestHandler<RegisterChakadCustomerCommand, RegisterChakadCustomerResponse>
{
  handle(value: RegisterChakadCustomerCommand): Promise<RegisterChakadCustomerResponse> {
    const apiClient = new APIClient<
      registerchakadcustomerRequest,
      RegisterChakadCustomerResponse
    >(import.meta.env.VITE_APP_INITIAL_CHAKAD);
    return apiClient.post(<registerchakadcustomerRequest>{
      CustomerNumber: value.CustomerNumber
    });
  }
}
