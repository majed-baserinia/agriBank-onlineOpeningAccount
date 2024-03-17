import { Mediator } from "@Mediatr/index";
import { useMutation } from "@tanstack/react-query";
import ActivationChakadCustomerCommand from "business/application/cheque/activationFirstStep/RegisterChakadCustomerCommand";
import ActivationChakadCustomerRequest from "common/entities/cheque/ActivationChakadCustomerRequest";
import ActivationChakadCustomerResponse from "common/entities/cheque/ActivationChakadCustomerResponse";
import { ErrorType } from "common/entities/ErrorType";

const mediator = new Mediator();
const useActivationChakadCustomer = () => {
  return useMutation<
    ActivationChakadCustomerResponse,
    ErrorType<ActivationChakadCustomerRequest>,
    ActivationChakadCustomerCommand
  >({
    mutationFn: (data: ActivationChakadCustomerCommand) =>
      mediator.send<ActivationChakadCustomerResponse>(
        new ActivationChakadCustomerCommand(data)
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
export default useActivationChakadCustomer;
