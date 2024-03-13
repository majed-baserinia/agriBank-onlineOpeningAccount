import { Mediator } from "@Mediatr/index";
import { useMutation } from "@tanstack/react-query";
import RegisterChakadCustomerCommand from "business/application/cheque/activationFirstStep/RegisterChakadCustomerCommand";
import RegisterChakadCustomerRequest from "common/entities/cheque/RegisterChakadCustomerRequest";
import RegisterChakadCustomerResponse from "common/entities/cheque/RegisterChakadCustomerResponse";
import { ErrorType } from "common/entities/ErrorType";

const mediator = new Mediator();
const useRegisterChakadCustomer = () => {
  return useMutation<
    RegisterChakadCustomerResponse,
    ErrorType<RegisterChakadCustomerRequest>,
    RegisterChakadCustomerCommand
  >({
    mutationFn: (data: RegisterChakadCustomerCommand) =>
      mediator.send<RegisterChakadCustomerResponse>(
        new RegisterChakadCustomerCommand(data)
      ),
    onMutate: (variables) => {
      return () => variables;
    },
    onSuccess: (data) => {
      return () => data;
    },
    onError: (error, variables) => {
      variables;
    }
  });
};
export default useRegisterChakadCustomer;
