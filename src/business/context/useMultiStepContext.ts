import { useContext } from "react";
import { MultiStepContext } from "ui/htsc-components/multi-step/MultiStepContext";

export const useMultiStepContext = <
  T extends Record<string, any> & { currentStep: keyof T }
>(): [
  T,
  (
    stepName: keyof T,
    stepValue: T[keyof T]
  ) => void,
  changeCurrentStep: (stepName: keyof T) => void
] => {
  const context = useContext(MultiStepContext);

  if (context === undefined) {
    throw new Error("useMultiStepContext was used outside of its Provider");
  }

  const setStepData = (stepName: keyof T, stepValue: T[keyof T]) => {
    context.setData((lastValue: T) => {
      lastValue[stepName] = stepValue;
      return { ...lastValue };
    });
  };

  const changeCurrentStep = (stepName: keyof T) => {
    context.setData((lastValue: T) => {
      lastValue["currentStep"] = stepName;
      return { ...lastValue };
    });
  };

  return [context.data as T, setStepData, changeCurrentStep];
};
