import { TextField, useTheme } from "@mui/material";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import useTextFieldStyles from "./useTextFieldStyles";

const formatToCart = (value: string) => {
  // Format input as 4 digits separated by "-"
  return value
    .replace(/[^0-9]/g, "")
    .replace(/(\d{4})/g, "$1-")
    .slice(0, 19);
};

const formatToMoney = (value: string) => {
  // Format input as 3 digits from right separated by ","
  const sanitizedInput = value.replace(/[^0-9]/g, "");
  const length = sanitizedInput.length;

  if (length <= 3) {
    return sanitizedInput;
  }

  const formattedValue =
    sanitizedInput.slice(0, length % 3 || 3) +
    sanitizedInput.slice(length % 3 || 3).replace(/(\d{3})/g, ",$1");

  return formattedValue;
};

const formatInput = (input: string, type: string) => {
  if (type === "card") {
    //  return formatToCart(input);
  } else if (type === "money") {
    return formatToMoney(input);
  } else {
    return input;
  }
};

export default function InputAdapter(props: InputAdapterProps) {
  const {
    placeholder,
    disabled = false,
    sx,
    isPassword = false,
    isRequired = false,
    label,
    icon,
    type,
    defaultValue = "",
    onChange,
    textFieldProps,
    inputProps,
    error = false,
    success = false,
    size = "md",
    helperText
  } = props;

  const theme = useTheme();
  const [value, setValue] = useState(formatInput(defaultValue, type ? type : ""));
  const [shrink, setShrink] = useState(defaultValue ? true : false);
  const [endIcon, setEndIcon] = useState<ReactNode>(null);
  const [cur, setCur] = useState<number[]>();
  const textFieldStyles = useTextFieldStyles({ theme, success, size });
  const inputRef = useRef<HTMLInputElement>();

  // useEffect(() => {
  //   setEndIcon(
  //     success ? (
  //       <EndIcon
  //         icon={sucIcon}
  //         alt="success"
  //       />
  //     ) : error ? (
  //       <EndIcon
  //         icon={alertIcon}
  //         alt="error"
  //       />
  //     ) : null
  //   );
  // }, [success, error]);

  const LableGenerator = useMemo(() => {
    return (
      <>
        {isRequired ? (
          <>
            {label}
            <span> *</span>
          </>
        ) : (
          label
        )}
      </>
    );
  }, [label, isRequired]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Save the cursor position before modifying the input value
    const cursorPosition = event.target.selectionStart;
    const originalValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = originalValue.replace(/[^0-9]/g, "");

    // // Format input as 4 digits separated by "-"
    // const formattedInput = numericValue.replace(/(\d{4})/g, "$1-").slice(0, 19);

    // // Calculate the difference in length between the original and formatted values
    const formattedInput = formatToMoney(numericValue);
    const lengthDiff = formattedInput.length - originalValue.length;

    setValue(formattedInput);
    onChange(formattedInput.replaceAll("-", "").replaceAll(",", ""));

    // Set the cursor position back to the saved position
    requestAnimationFrame(() => {
      event.target.setSelectionRange(
        (cursorPosition as number) + lengthDiff,
        (cursorPosition as number) + lengthDiff
      );
    });
  };

  useEffect(() => {
    //change the keyboard to numeric
    if (inputRef.current) {
      inputRef.current.inputMode = "numeric";
    }
  }, []);

  return (
    <TextField
      fullWidth
      helperText={helperText}
      size="medium"
      onFocus={() => {
        setShrink(true);
      }}
      onBlur={(e) => {
        e.target.blur();
        value ? setShrink(true) : setShrink(false);
      }}
      disabled={disabled}
      type={isPassword ? "password" : "text"}
      label={LableGenerator}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      sx={{ ...textFieldStyles, ...sx }}
      error={error}
      inputRef={inputRef}
      InputProps={{
        dir: "ltr",

        inputMode: "numeric",
        sx: { input: { color: theme.palette.grey[800] } },
        // startAdornment: icon ? (
        //   <InputAdornment position="start">{icon}</InputAdornment>
        // ) : null,
        // endAdornment:
        //   error || success ? (
        //     <InputAdornment position="end">{endIcon}</InputAdornment>
        //   ) : null,
        ...inputProps
      }}
      InputLabelProps={{
        shrink: shrink,
        style: {
          transform: shrink
            ? ""
            : `translate(${icon ? -43 : -13}px, ${size === "md" ? "14px" : "18px"})`
        }
      }}
      {...textFieldProps}
    />
  );
}
