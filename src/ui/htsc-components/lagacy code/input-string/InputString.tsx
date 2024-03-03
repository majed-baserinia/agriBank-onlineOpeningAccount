import { AccountCircle } from "@mui/icons-material";
import { FormControl, InputAdornment, useTheme } from "@mui/material";
import React, { useState } from "react";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import { MatFormHelperText, MatInputLabel, MatOutlinedInput } from "./StyledInputString";

interface Props {
  isRequired?: boolean;
  id?: string;
  label?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  multiline?: boolean;
  maxRows?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  maxLength?: number;
  onChange: (value: string) => void;
  // register?: UseFormRegister<FieldValues>;
}

function InputString({
  isRequired = false,
  id = "",
  label = "",
  value = "",
  name = "",
  placeholder = "",
  multiline = false,
  maxRows = 0,
  disabled = false,
  error = false,
  errorMessage = "",
  maxLength = 0,
  onChange // register
}: Props) {
  const theme = useTheme();

  const onInputSelect = (inputElem: HTMLInputElement) => {
    inputElem.value = inputElem.value.toString().slice(0, maxLength);
  };

  const [isFocused, setIsFocused] = useState(false);

  const onInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <MaterialThemeProvider >
      <FormControl
        size="small"
        variant="outlined"
        className="w-full"
      >
        {isRequired ? (
          <MatInputLabel
            required
            shrink={isFocused || !!value}
            htmlFor={id}
          >
            {label}
          </MatInputLabel>
        ) : (
          <MatInputLabel
            htmlFor={id}
            shrink={isFocused || !!value}
          >
            {label}
          </MatInputLabel>
        )}
        <MatOutlinedInput
          id={id}
          onChange={onInputChange}
          type="text"
          value={value}
          autoComplete="off"
          error={error}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          onInput={(event) => onInputSelect(event.target as HTMLInputElement)}
          multiline={multiline}
          maxRows={maxRows}
          sx={{ mt: 1 }}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle style={{ color: `${theme.palette.secondary.dark}` }} />
            </InputAdornment>
          }
        />
        {error && <MatFormHelperText>{errorMessage}</MatFormHelperText>}
      </FormControl>
    </MaterialThemeProvider>
  );
}

export default InputString;
