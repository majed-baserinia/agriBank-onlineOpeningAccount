import { createTheme, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import AutoCompleteMob from "./Auto-Complete-Mob";
import AutoCompleteWeb from "./Auto-Complete-Web";
 interface Option {
  label: string;
  value: string;
  code: string;
  nameIcon: string; 
  iconImg: string;
}
interface Props<TOption extends Option, TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  setValue: (name: Path<TFieldValues>, value: FieldValues["value"]) => void;
  getValue?: string | undefined;

  name: Path<TFieldValues>;
  isRequired?: boolean;
  id?: string;
  label?: string;
  options: TOption[];
  minRequiredCharacters?: number;
  className?: string;
  isOpen: boolean;
  freeSolo:boolean;
  onInputValueChanged?: (value: string, hasReachedMinRequiredCharacters: boolean) => void;
  // onOptionSelected?: (options: TOption | null) => void;
}
export default function CustomAutoComplete<
  TOption extends Option,
  TFieldValues extends FieldValues
>({
  freeSolo,
  isRequired = false,
  id = "",
  label = "",
  options,
  name,
  className = "",
  register,
  setValue,
  getValue,
  isOpen,
  minRequiredCharacters = 0,
  onInputValueChanged //,
} // onOptionSelected
: Props<TOption, TFieldValues>) {
  const settings = useInitialSettingStore((s) => s.setting);
  // const themeTemplate = createTheme({
  //   ...settings.themeConfig,
  //   direction: settings.language === "fa-IR" ? "rtl" : "ltr",
  //   typography: {
  //     fontFamily: settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
  //   }
  // });
  const themeTemplate=useTheme()
  const matches = useMediaQuery(themeTemplate.breakpoints.down("md"));

  return (
    <>
      {!matches ? (
        <>
          <AutoCompleteWeb
            isOpen={isOpen}
            onInputValueChanged={onInputValueChanged}
            register={register}
            name={name}
            options={options}
            setValue={setValue}
            className={className}

            id={id}
            isRequired={isRequired}
            label={label}
            minRequiredCharacters={minRequiredCharacters}
            freeSolo={freeSolo}
          />
        </>
      ) : (
        <>
          <AutoCompleteMob
            isOpen={isOpen}
            onInputValueChanged={onInputValueChanged}
            //openSheet={true}
            register={register}
            name={name}
            options={options}
            setValue={setValue}
            className={className}

            id={id}
            isRequired={isRequired}
            label={label}
            minRequiredCharacters={minRequiredCharacters}
            freeSolo={freeSolo}
          />
        </>
      )}
    </>
  );
}
