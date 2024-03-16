import RegisterChakadCustomerResponse from "common/entities/cheque/RegisterChakadCustomerResponse";
import { create } from "zustand";

 interface RegisterChakadCustomer {
    ActivationKey: RegisterChakadCustomerResponse;
}

interface AccountChargeQueryStore {
    ActivationKey_RegisterChakadCustomer: RegisterChakadCustomer

  setChakad_FirstStep: (activationKey: string) => void;
}

export const useAccountChargeStore = create<AccountChargeQueryStore>((set) => ({
    ActivationKey_RegisterChakadCustomer: <RegisterChakadCustomer>{},
    setChakad_FirstStep: (activationKey) =>
    set((store) => ({
        ActivationKey_RegisterChakadCustomer: { ...store.ActivationKey_RegisterChakadCustomer, activationKey},
    })),
 }));
