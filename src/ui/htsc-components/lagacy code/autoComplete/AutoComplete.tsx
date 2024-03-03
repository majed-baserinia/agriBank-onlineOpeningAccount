import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import mapcardicon from "ui/htsc-components/Bank-Icon/BankIcon";
import { Props } from "./type";

const formatToCart = (value: string) => {
  // Format input as 4 digits separated by "-"
  return value
    .replace(/[^0-9]/g, "")
    .replace(/(\d{4})/g, "$1-")
    .slice(0, 19);
};

const iconGenerator = (value: string) => {
  const foundIcon =
    value.length > 6 &&
    mapcardicon.find(
      (icon) => value.replaceAll("-", "").substring(0, 6) == icon.cardnumber
    );
  return (
    foundIcon && (
      <Grid sx={{ height: "24px", width: "24px" }}>
        <img
          style={{ width: "100%", height: "100%" }}
          src={foundIcon?.icon}
          alt={foundIcon?.name}
        />
      </Grid>
    )
  );
};

const AutoComplete = <T,>(props: Props<T>) => {
  const {
    hasConfirmButton = false,
    selectOptions,
    onChangeValue,
    renderOption,
    loading = false,
    label,
    freeSolo = false,
    isOptionEqualToValue,
    valueToShowToInput,
    valueToSendToServiceOnChange,
    onPoperOpen,
    onPoperclose,
    muiAutoCompleteProps,
    muiButtonProps,
    isRequired = false,
    isCart,
    startIcon,
    minRequiredCharacters = 0,
    onInputValueChanged,
    error = false,
    helperText
  } = props;

  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const autoRef = useRef<HTMLInputElement>();

  const [selectedValue, setSelectedValue] = useState<T | null | string | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isShrink, setShrink] = useState(false);
  const [isMobileStyle, setIsMobileStyle] = useState(false);
  const startIconDynamic = useRef<ReactNode>(startIcon);

  useEffect(() => {
    //change the keyboard to numeric
    if (autoRef.current) {
      autoRef.current.inputMode = "numeric";
    }

    //logic for "go back" button on browser to prevent
    matches && window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handlePopState = (event: PopStateEvent) => {
    event.preventDefault();
    setOpen(false);
    setIsMobileStyle(false);
  };

  const mobileStyle = useMemo(() => {
    return {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      zIndex: "9",
      padding: "16px",
      height: window.innerHeight + "px"
    };
  }, []);

  const combinedStyles = useMemo(() => {
    return {
      width: "100%",
      // transition: "all .4s ease",
      backgroundColor: theme.palette.background.default,
      ...(matches && open && isMobileStyle ? mobileStyle : {})
    };
  }, [matches, open, isMobileStyle, theme]);

  const onOpen = () => {
    //this line is for making the "go back" button on browser to close the list
    matches && history.pushState(true, "inputOpen");
    setOpen(true);
    onPoperOpen && onPoperOpen();
  };

  const onClose = () => {
    !hasConfirmButton ? setOpen(false) : null;
    !hasConfirmButton ? onPoperclose && onPoperclose() : null;
  };

  const isOptionEqualToValueFunction = (option: string | T, value: string | T) => {
    if (typeof option === "string" || typeof value === "string") {
      return option === value;
    } else {
      return isOptionEqualToValue(option, value);
    }
  };

  const getOptionLabelFunction = (option: string | T) => {
    if (typeof option == "string") {
      return option;
    }
    const { text, icon } = valueToShowToInput(option);

    return text;
  };

  const onChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newValue: string | T | null
  ) => {
    if (newValue === null) return "";
    if (typeof newValue === "string") {
      onChangeValue(newValue);
      return newValue;
    }
    const value = valueToSendToServiceOnChange(event, newValue);

    onChangeValue(value);
    const { text, icon } = valueToShowToInput(newValue);
    startIconDynamic.current = icon;

    isCart ? setSelectedValue(formatToCart(value)) : setSelectedValue(text);

    setShrink(true);

    matches ? (!hasConfirmButton ? setOpen(false) : null) : setOpen(false);
  };

  const onInputChangeHandler = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string,
    reason: AutocompleteInputChangeReason
  ) => {
    const target = event?.target as HTMLInputElement;
    if (reason === "clear" || target?.value! === "") {
      setSelectedValue("");
      onChangeValue("");
    }
    freeSolo && (startIconDynamic.current = iconGenerator(newInputValue));
    freeSolo && (setSelectedValue(newInputValue), onChangeValue(newInputValue));

    if (isCart) {
      const formattdValue = formatToCart(newInputValue);
      const cursorPosition =
        event && event?.type == "change" ? target?.selectionStart : null;
      const deleting =
        event && event.type == "change"
          ? (event.nativeEvent as InputEvent)?.inputType === "deleteContentBackward"
          : null;

      const lengthDiff = deleting
        ? target.value.length - newInputValue.length
        : formattdValue.length - newInputValue.length;

      if (deleting) {
        setInputValue(newInputValue);
        setSelectedValue(newInputValue);
        onChangeValue(newInputValue.replaceAll("-", ""));
      } else {
        setInputValue(formattdValue);
        setSelectedValue(formattdValue);
        onChangeValue(formattdValue.replaceAll("-", ""));
      }
      event && event.type == "change"
        ? requestAnimationFrame(() => {
            target?.setSelectionRange(
              (cursorPosition as number) + lengthDiff,
              (cursorPosition as number) + lengthDiff
            );
          })
        : null;
    } else {
      setInputValue(newInputValue);
    }

    onInputValueChanged &&
      onInputValueChanged(newInputValue, newInputValue.length >= minRequiredCharacters);
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-between"}
      sx={combinedStyles}
    >
      <Autocomplete
        onClick={(e) => {}}
        popupIcon={<KeyboardArrowDownIcon />}
        freeSolo={freeSolo}
        noOptionsText=""
        open={open}
        renderOption={renderOption}
        options={selectOptions}
        onOpen={onOpen}
        loading={loading}
        onClose={onClose}
        isOptionEqualToValue={isOptionEqualToValueFunction}
        getOptionLabel={getOptionLabelFunction}
        value={selectedValue}
        onClickCapture={() => setIsMobileStyle(true)}
        onChange={onChangeHandler}
        inputValue={inputValue}
        onInputChange={onInputChangeHandler}
        {...muiAutoCompleteProps}
        renderInput={(params) => (
          <TextField
            dir={theme.direction}
            {...params}
            error={error}
            helperText={helperText}
            type="text"
            inputRef={autoRef}
            label={label}
            required={isRequired}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: "48px"
              }
            }}
            onFocus={() => setShrink(true)}
            InputProps={{
              onBlur: (e) => e.target.blur(),
              inputMode: "numeric",
              sx: { borderRadius: "8px" },
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              startAdornment: startIconDynamic?.current && (
                <InputAdornment position="start">
                  {startIconDynamic?.current}
                </InputAdornment>
              )
            }}
          />
        )}
        PopperComponent={(props) => (
          <Popper
            {...props}
            sx={{
              boxShadow: matches ? 0 : 3
            }}
          />
        )}
        PaperComponent={(props) => (
          <Paper
            {...props}
            elevation={0}
            sx={
              matches
                ? {
                    marginTop: "20px",
                    overflow: "hidden"
                  }
                : { padding: "16px" }
            }
          />
        )}
        ListboxProps={{
          sx: { height: "100%", maxHeight: "100%" }
        }}
      />
      <Grid>
        {matches && hasConfirmButton && open && isMobileStyle && (
          <Button
            sx={{
              borderRadius: "16px",
              width: "100%",
              height: "48px",
              zIndex: "110010"
            }}
            onClick={() => {
              matches && history.back();
              setOpen(false);
              onPoperclose && onPoperclose();
            }}
            variant="contained"
            color="primary"
            {...muiButtonProps}
          >
            {t("Confirm")}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default AutoComplete;
