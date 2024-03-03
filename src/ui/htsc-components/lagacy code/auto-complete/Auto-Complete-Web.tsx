import { Autocomplete, Divider, FormControl, TextField, createTheme, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { Fragment, useState } from "react";
import { FieldPath, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import { MatInputLabel } from "./StyledAuto-Complete";
interface Option { label: string; value: string; code: string, nameIcon: string; iconImg: string; }

interface Props<
  TOption extends Option,
  TFieldValues extends FieldValues
> {
  register: UseFormRegister<TFieldValues>;
  setValue: (name: Path<TFieldValues>, value: FieldValues["value"]) => void;
  name: FieldPath<TFieldValues>;
  isRequired?: boolean;
  id?: string;
  label?: string;
  options: TOption[];
  getValue?: TOption;
  minRequiredCharacters?: number;
  className?: string;
  isOpen: boolean;
  onInputValueChanged?: (value: string, hasReachedMinRequiredCharacters: boolean) => void;
  freeSolo?: boolean
  //onOptionSelected?: (options: TOption | null |string) => void;
}
export default function AutoCompleteWeb<
  TOption extends Option,
  TFieldValues extends FieldValues
>({
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
  // getValue,
  minRequiredCharacters = 0,
  onInputValueChanged,
  freeSolo
  //  onOptionSelected
}: Props<TOption, TFieldValues>) {
  //#region "theme"
  // const settings = useInitialSettingStore((s) => s.setting);
  // const theme = createTheme({
  //   ...settings.themeConfig,
  //   direction: settings.language === "fa-IR" ? "rtl" : "ltr",
  //   typography: {
  //     fontFamily: settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
  //   }
  // });
  const theme = useTheme();

  const customStyle = {
    borderRadius: theme.shape.borderRadius,
    minWidth: 120,
    "& .MuiSelect-select": {
      paddingRight: theme.spacing(3)
    },
    "& .MuiSelect-icon": {
      right: 0,
      top: "50%",
      transform: "translateY(-50%)"
    }
  };
  //#endregion "theme"

  //#region "useSatet"
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState<TOption>();

  React.useLayoutEffect(() => {
    setSelectedValue(getValue);
  }, []);
  const loading = open;

  //#endregion "useState"

  //#region "methode"
  const onInputSelect = (inputElem: HTMLInputElement) => {
    inputElem.value = inputElem.value.toString().slice(0);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleUpdateState = () => {
    const newState = { someData: "newData" };

    navigate("/AccountCharge", {
      state: newState
    });
  };
  //#endregion "methode"
  return (
    <FormControl
      size="small"
      variant="outlined"
      className="w-full"
    >
      {isRequired ? (
        <MatInputLabel
          required
          theme={theme}
          shrink={isFocused || !!inputValue}
          htmlFor={id}
        >
          {label}
        </MatInputLabel>
      ) : (
        <MatInputLabel
          theme={theme}
          htmlFor={id}
          shrink={isFocused || !!inputValue}
        >
          {label}
        </MatInputLabel>
      )}

      <Autocomplete
        style={customStyle}
        classes={{
          root: `text-[${theme.palette.background.paper}]
                  }`
        }}
        id={id}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        freeSolo={freeSolo}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        value={selectedValue}
        onInput={(event) => onInputSelect(event.target as HTMLInputElement)}


        options={options}
        noOptionsText={""}
        onInputChange={(event, value) => {
          const prevLocation = location?.state?.key;
          if (prevLocation === "oblig") {
            handleUpdateState();
            value = getValue?.label + "#" + getValue?.value + " " + getValue?.code;
            onInputValueChanged &&
              onInputValueChanged(
                getValue
                  ? getValue?.label + "* " + getValue?.value + " " + getValue?.code
                  : "",
                false
              );
            setValue(name, getValue);
          } else {
            onInputValueChanged &&
              onInputValueChanged(value, value.length >= minRequiredCharacters);
          }
          setInputValue(value);
          setValue(name, value);
        }}
        // getOptionLabel={(option) =>
        //   option.label + " " + option.value + " " + option.code
        // }
        renderOption={(props, option, { selected }) => (
          <li {...props} >
                   {
                      option.iconImg ? <img height="50px" width="40px" src={option.iconImg} alt={option.nameIcon} />
                        : null
                    }
            <span>{option.label + " " + option.nameIcon + " " + option.value + " " + option.code}</span>
          </li>
        )}
        onSelect={() => setSelectedValue}
        loadingText="loading"
        renderInput={(params) => (
          <TextField
            {...params}
            {...register(name, {
              onChange: (e) => {
                setInputValue(e.target.value);
                setValue(name, e.target.value);
              },
              onBlur: handleBlur
            })}
            variant="outlined"
            onFocus={handleFocus}
            InputProps={{
              ...params.InputProps,
              sx:{borderRadius: '16px'},
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              )
            }}
          />
        )}
      />
    </FormControl>
  );
}
