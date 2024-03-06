import React, { ReactNode, useState } from "react";

export const MultiStepContext = React.createContext<{
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}>({ data: {}, setData: (n) => {} });

interface Props<TValue extends Record<string, any>> {
  value: TValue;
  children: ReactNode;
}

export function MultiStepContextProvider<TValue extends Record<string, any>>({
  value,
  children
}: Props<TValue>) {
  const [data, setData] = useState(value);
  return (
    <MultiStepContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </MultiStepContext.Provider>
  );
}
