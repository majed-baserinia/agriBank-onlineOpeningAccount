import { FormControl, InputAdornment, useTheme } from "@mui/material";
import { formatAmount } from "common/utils";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  FieldPath,
  FieldValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import MaterialThemeProvider from "ui/components/MaterialThemeProvider";
import { v4 as uuidv4 } from "uuid";
import {
  MatFormHelperText,
  MatInputLabel,
  MatOutlinedInput
} from "./StyledInputNumberTemp";
type InputType = React.HTMLInputTypeAttribute | "card" | "money";

interface Props<TFieldValues extends FieldValues> {
  register?: UseFormRegister<TFieldValues>;
  name: FieldPath<TFieldValues>;
  isRequired?: boolean;
  id?: string;
  label?: string;
  value?: string;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  inputType?: InputType;
  placeholder?: string;
  className?: string;
  inputStyle?: {};
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValue?: UseFormSetValue<any>;
  endAdornment?: ReactNode | ReactNode[];
  startAdornment?: ReactNode | ReactNode[];
  sx?: {};
  showPassword?: boolean;
  focus?: boolean;
  helperText?: string
}

function InputNumberTemp<TFieldValues extends FieldValues>({
  register,
  name,
  isRequired = false,
  id = "",
  label = "",
  onChange,
  value = "",
  multiline = false,
  maxRows = 0,
  disabled = false,
  error = false,
  errorMessage = "",
  maxLength,
  inputType,
  placeholder = "",
  className = "",
  sx,
  endAdornment,
  inputStyle,
  showPassword = false,
  startAdornment,
  focus,
  helperText
}: Props<TFieldValues>) {
  const ref = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();
  const theme = useTheme();
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    
    if (focus) {
      
      ref.current?.focus();
    } 
  }, [focus]);

  useMemo(() => {
    setInputValue(value);
  }, [value]);

  id = id + uuidv4();

  const onInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: InputType | undefined,
    isNumeric: boolean
  ) => {
    let start = event.target.selectionStart;
    let end = event.target.selectionEnd;

    let resultValue = event.target.value;
    if (!resultValue || (resultValue?.trim()?.length ?? 0) === 0) {
      setInputValue(resultValue);
      return;
    }

    resultValue = resultValue.trim();

    if (isNumeric) {
      let regex: RegExp;
      switch (type) {
        case "card": {
          regex = RegExp(/^[\d -]+$/);
          break;
        }
        case "money": {
          regex = RegExp(/^[\d,]+$/);
          break;
        }
        default: {
          regex = RegExp(/^\d+$/);
          break;
        }
      }
      if (!regex.test(resultValue)) {
        // prevent cursor from going one character forward if we are gonna delete the ALPHA character anyways
        start && (start -= 1);
        end && (end -= 1);
      }
      resultValue = filterNoneNumericValues(resultValue);
    }
    const rawValue = resultValue;
    // this check should go first because we might change the cursor position on isNumeric test
    if (type === "card") {
      resultValue = beautifyCardInput(resultValue, event.target.maxLength ?? 18);
      // if value has change and cursor was at the end
      if (rawValue !== resultValue && start === event.target.value.length) {
        // move cursor by CARD_NUMBER_SEPARATOR.length if added the separator
        start && (start += CARD_NUMBER_SEPARATOR.length);
        end && (end += CARD_NUMBER_SEPARATOR.length);
      }
    } else if (inputType == "money") {
      // TODO: handle scenarios where formatAmount actually changes the input string
      // on those cases we should move the cursor accordingly
      resultValue = formatAmount(resultValue);
      if (rawValue !== resultValue && start === event.target.value.length) {
        start = resultValue.length;
        end = resultValue.length;
      }
    }
    // preserve cursor position
    event.target.value = resultValue;
    event.target.setSelectionRange(start, end);
    onChange && onChange(event);

    if (resultValue === event.target.value) {
      setInputValue(resultValue);
      return;
    }
    console.log(resultValue);

    setInputValue(resultValue);
  };

  const handleFocus = () => {
    console.log("focusesd");
    
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`grid grid-cols-1 grid-rows-1 gap-x-4 ${className}`}>
      <MaterialThemeProvider>
        <FormControl
          // size="small"
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
          <MatOutlinedInput
          
            inputRef={ref}
            classes={{ input: "rtl" }}
            id={id}
            name={name}
            // type="text"
            type={showPassword ? "password" : "text"}
            placeholder={t(placeholder)}
            value={inputValue ?? ""}
            autoComplete="off"
            error={error}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            inputProps={{
              
              inputMode: "numeric",
              maxLength: maxLength,
              ...register?.(name, {
                onChange: (e) => {
                  onInputChangeHandler(e, inputType, true);
                }
              }),
              style: { height: "19px", ...inputStyle }
            }}
            multiline={multiline}
            maxRows={maxRows}
            sx={{ mt: 1, ...sx }}
            endAdornment={
              endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : null
            }
            startAdornment={
              startAdornment ? (
                <InputAdornment position="start">{startAdornment}</InputAdornment>
              ) : null
            }
          />
          {error && <MatFormHelperText>{helperText}</MatFormHelperText>}
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

export default InputNumberTemp;
