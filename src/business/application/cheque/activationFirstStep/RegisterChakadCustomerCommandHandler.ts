import { IRequestHandler, requestHandler } from "@Mediatr/index";
import APIClient from "business/infrastructure/api-client";
import RegisterchakadcustomerRequest from "common/entities/cheque/RegisterChakadCustomerRequest";
import RegisterChakadCustomerResponse from "common/entities/cheque/RegisterChakadCustomerResponse";
import RegisterChakadCustomerCommand from "./RegisterChakadCustomerCommand";

@requestHandler(RegisterChakadCustomerCommand)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class RegisterChakadCustomerCommandHandler
  implements
    IRequestHandler<RegisterChakadCustomerCommand, RegisterChakadCustomerResponse>
{
  handle(value: RegisterChakadCustomerCommand): Promise<RegisterChakadCustomerResponse> {    
    const apiClient = new APIClient<
      RegisterchakadcustomerRequest,
      RegisterChakadCustomerResponse
    >(import.meta.env.VITE_APP_INITIAL_CHAKAD);
    return apiClient.post(<RegisterchakadcustomerRequest>{
      CustomerNumber: value.CustomerNumber
    });
  }
}
