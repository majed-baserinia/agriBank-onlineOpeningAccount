import * as React from "react";
import MaterialThemeProvider from "ui/components/MaterialThemeProvider";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";

import {
  MatCheckbox,
  MatFormControl,
  MatFormControlLabel,
  MatFormGroup
} from "./StyledCheckBox";
interface  Props<TFieldValues extends FieldValues> {
  className?: string;
  id?: string;
  label: string|undefined;
  // value: string;
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelPlacement: "top" | "bottom" | "start" | "end";
  
  register?: UseFormRegister<TFieldValues>;
  name?: FieldPath<TFieldValues>;
}
export default function Checkbox<TFieldValues extends FieldValues>({
  label,
  isChecked,
  onChange,
  labelPlacement,
  className,
  id,
  name,
  register
}: Props<TFieldValues>) {
  return (
    <MaterialThemeProvider>
      <MatFormControl className={className}>
        <MatFormGroup
          aria-label="position"
          row
        >
          <MatFormControlLabel
            //  value={value}
            control={
              <MatCheckbox
                name={name}
                id={id}
               // defaultChecked={isChecked}
                checked={isChecked}
                onChange={onChange}
              />
            }
            label={label}
            labelPlacement={labelPlacement}
            // checked={isChecked}
          />
        </MatFormGroup>
      </MatFormControl>
    </MaterialThemeProvider>
  );
}
