import { FormControl } from "@mui/material";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { v4 as _uuid } from "uuid";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import { MatFormHelperText, MatInputLabel, MatOutlinedTextarea } from "./StyledTextarea";

type InputType = React.HTMLInputTypeAttribute | "card";

interface Props {
  register: UseFormRegister<any>;
  isRequired?: boolean;
  id?: string;
  label?: string;
  name?: string;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  inputType?: InputType;
  placeholder?: string;
  className?: string;
}

function InputNumber({
  register,
  isRequired = false,
  id = "",
  label = "",
  name = "",
  multiline = false,
  maxRows = 0,
  disabled = false,
  error = false,
  errorMessage = "",
  maxLength = 0,
  inputType,
  placeholder = "",
  className = ""
}: Props) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState<string>();
  id = id + _uuid();

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: InputType | undefined,
    isNumeric: boolean
  ) => {
    let start = event.target.selectionStart;
    let end = event.target.selectionEnd;

    let resultingValue = event.target.value;
    if (!resultingValue || (resultingValue?.trim()?.length ?? 0) === 0) {
      setInputValue(resultingValue);
      return;
    }

    resultingValue = resultingValue.trim();

    if (resultingValue === event.target.value) {
      setInputValue(resultingValue);
      return;
    }

    // preserve cursor position
    event.target.value = resultingValue;
    event.target.setSelectionRange(start, end);
    setInputValue(resultingValue);
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`grid grid-cols-1 grid-rows-1 gap-x-4 ${className}`}>
    <MaterialThemeProvider >
      <FormControl
        size="small"
        variant="outlined"
        className="w-full"
      >
        {isRequired ? (
          <MatInputLabel
            // classes={{ root: `order-0 flex items-center` }}
            required
            shrink={isFocused || (inputValue?.length ?? 0) > 0}
            htmlFor={id}
          >
            {t(label)}
          </MatInputLabel>
        ) : (
          <MatInputLabel
            htmlFor={id}
            shrink={isFocused || (inputValue?.length ?? 0) > 0}
          >
            {t(label)}
          </MatInputLabel>
        )}

        <MatOutlinedTextarea
        className={className}
          variant="outlined"
          id={id}
          placeholder={t(placeholder)}
          autoComplete="off"
          error={error}
          onFocus={handleFocus}
          disabled={disabled}
          maxLength={maxLength}
          multiline={true}
          {...register(name, {
            onChange: (e) => {
              onInputChangeHandler(e, inputType, true);
            },
            onBlur: handleBlur
          })}
          rows={maxRows}
        />

        {error && <MatFormHelperText>{errorMessage}</MatFormHelperText>}
      </FormControl>
    </MaterialThemeProvider>
    </div>
  );
}
const CARD_NUMBER_SEPARATOR = " - ";

const filterNoneNumericValues = (value: string): string => {
  value = value.replace(/ /g, "");
  value = value.replace(/\D/g, "");
  return value;
};

const beautifyCardInput = (value: string, maxLength: number): string => {
  if (value.length > maxLength) {
    value = value.substring(0, maxLength);
  }

  const splits = value.match(/.{1,4}/g);

  let spacedCardNumber = "";
  if (splits) {
    spacedCardNumber = splits.join(CARD_NUMBER_SEPARATOR);
  }
  return spacedCardNumber;
};

export default InputNumber;
