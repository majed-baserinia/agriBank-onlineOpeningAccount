import { FormControl, InputAdornment, createTheme } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import { formatAmount, prvFunToDigitsNumber, splitCard } from "../../../common/utils";
import { MatFormHelperText, MatInputLabel, MatOutlinedInput } from "./StyledInputNumber";

type InputType = React.HTMLInputTypeAttribute | "card" | "money";

interface Props {
  isRequired?: boolean;
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  multiline?: boolean;
  placeholder?: string;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  inputType?: InputType;
  endAdornment?: ReactNode | ReactNode[];
  startAdornment?: ReactNode | ReactNode[];
  register?: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

function InputNumber({
  isRequired = false,
  id = "",
  label = "",
  name = "",
  value = "",
  placeholder = "",
  multiline = false,
  maxRows = 0,
  disabled = false,
  error = false,
  errorMessage = "",
  maxLength = 0,
  inputType,
  endAdornment,
  startAdornment,
  register,
  setValue
}: Props) {
  const settings = useInitialSettingStore((s) => s.setting);
  const [inputValue, setInputValue] = useState<string>(value);

  const themeTemplate = createTheme({
    ...settings.themeConfig,
    direction: settings.language === "fa-IR" ? "rtl" : "ltr",
    typography: {
      fontFamily: settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
    }
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let resultingValue = event.target.value;
    resultingValue = resultingValue
      .replace(/[^۰۱۲۳۴۵۶۷۸۹0-9]/g, "")
      .toString()
      .slice(0, maxLength);

    if (!!resultingValue) {
      if (inputType == "money") {
        resultingValue = formatAmount(resultingValue);
      } else if (inputType == "card") {
        resultingValue = splitCard(resultingValue);
      }
    }

    event.target.value = resultingValue;
    setInputValue(resultingValue);
    setValue(name, prvFunToDigitsNumber(resultingValue));
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || (event.key === "Enter" && event.key === "Fn")) {
      event.preventDefault();
    }
  };

  return (
    <FormControl
      size="small"
      variant="outlined"
      className="w-full"
    >
      <MatInputLabel
        required={isRequired}
        theme={themeTemplate}
        shrink={isFocused || !!inputValue || !!value}
        htmlFor={id}
      >
        {label}
      </MatInputLabel>

      <MatOutlinedInput
        theme={themeTemplate}
        id={id}
        name={name}
        type="tel"
        autoComplete="off"
        error={error}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        inputProps={{
          inputMode: "numeric",
          maxLength: maxLength,
          ...register!(name, {
            valueAsNumber:
              inputType !== "card" && inputType !== "money" && inputType !== "text",
            onChange: (e) => {
              onInputChangeHandler(e);
            }
          })
        }}
        inputRef={register!(name).ref}
        onChange={register!(name).onChange}
        multiline={multiline}
        maxRows={maxRows}
        sx={{ mt: 1 }}
        startAdornment={
          startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null
        }
        endAdornment={
          endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null
        }
      />
      {error && <MatFormHelperText>{errorMessage}</MatFormHelperText>}
    </FormControl>
  );
}

export default InputNumber;
