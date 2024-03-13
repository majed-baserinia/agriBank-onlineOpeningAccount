import { Mediator } from "@Mediatr/index";
import { useMutation } from "@tanstack/react-query";
import SignChakadCustomerCommand from "business/application/cheque/activationSecondStep/SignChakadCustomerCommand";
import SignChakadCustomerRequest from "common/entities/cheque/SignChakadCustomerRequest";
import SignChakadCustomerResponse from "common/entities/cheque/SignChakadCustomerResponse";
import { ErrorType } from "common/entities/ErrorType";

const mediator = new Mediator();
const useSignChakadCustomer = () => {
  return useMutation<
    SignChakadCustomerResponse,
    ErrorType<SignChakadCustomerRequest>,
    SignChakadCustomerCommand
  >({
    mutationFn: (data: SignChakadCustomerCommand) =>
      mediator.send<SignChakadCustomerResponse>(new SignChakadCustomerCommand(data)),
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
export default useSignChakadCustomer;
