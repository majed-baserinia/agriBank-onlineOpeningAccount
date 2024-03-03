import { Autocomplete, Divider, FormControl, Grid, TextField, createTheme, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { Fragment, useState } from "react";
import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import Sheet from "react-modal-sheet";
import { useLocation, useNavigate } from "react-router-dom";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import { MatInputLabel } from "./StyledAuto-Complete";
import LoadingButton from "ui/htsc-components/buttons/loading-button/LoadingButton";
import { t } from "i18next";
import { theme } from "@chakra-ui/react";
interface Option { label: string; value: string; code: string, nameIcon: string; iconImg: string; }
interface Props<
  TOption extends Option,
  TFieldValues extends FieldValues
> {
  register: UseFormRegister<TFieldValues>;
  setValue: any;
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
  onOptionSelected?: (options: TOption | null | string) => void;
  freeSolo: boolean;
}
export default function AutoCompleteMob<
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
  minRequiredCharacters = 0,
  onInputValueChanged,
  onOptionSelected,
  freeSolo
}: Props<TOption, TFieldValues>) {
  //#region "theme"
  const theme = useTheme()
  // const customStyle = {
  //   borderRadius: theme.shape.borderRadius,
  //   minWidth: 120,
  //   "& .MuiSelect-select": {
  //     paddingRight: theme.spacing(3)
  //   },
  //   "& .MuiSelect-icon": {
  //     right: 0,
  //     top: "50%",
  //     transform: "translateY(-50%)"
  //   }
  // };
  //#endregion ""
  const count = 0;
  const jafar = (option: any) => {
    // getValue getValue?.label + " " + getValue?.value + " " + getValue?.code :
    return option.label + " " + option.value + " " + option.code;
  };

  //#region "useSatet"
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [labelSelected, setLabelSelected] = useState<string>();
  const [confirmButtonShow, setConfirmButtonShow] = useState<Boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  const loading = open;
  const autoRef = React.useRef<HTMLInputElement>()

  React.useEffect(() => {
    setLabelSelected(getValue?.label);
    handleFocus();
  }, []);

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
    <>
      {" "}
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
        <TextField
          InputProps={{ sx: { borderRadius: '8px', height: '48px',  color: theme.palette.grey[300]  } }}
          InputLabelProps={{
            style: { color: theme.palette.grey[300] },
          }}
          onClick={(e) => {
            setOpenSheet(true);
          }}
          id={id}
          value={labelSelected}
        />
        <Sheet
          isOpen={openSheet}
          onClose={() => { setOpenSheet(false); setOpen(false) }} //setOpenSheet(false)
          onOpenEnd={() => {
            setOpen(isOpen)
            setConfirmButtonShow(true)
            autoRef.current?.focus()
          }}
        >
          <Sheet.Container
            style={{
              backgroundColor: theme.palette.background.paper
            }}
          >
            <Sheet.Header />
            <Sheet.Content style={{ padding: '15px', display: "flex", flexDirection: 'column', justifyContent: 'space-between' }}>
              <Autocomplete
               ListboxProps={{ style: { maxHeight: '60vh', overflowY:'auto' } }}
                noOptionsText={""}
                //style={customStyle}
               
                classes={{
                  root: `text-[${theme.palette.background.paper}]
                }`
                }}
                id={id}
                open={open}
                onOpen={(a) => {
                  console.log(a);
                  setOpen(isOpen);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                freeSolo={freeSolo}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                value={getValue}
                inputValue={inputValue}
                // onInput={(event) => onInputSelect(event.target as HTMLInputElement)}

                options={options}
                onInputChange={(event, value, b) => {


                  if (value.search("undefined") == 0) {
                    setInputValue("");
                    return;
                  }

                  const prevLocation = location?.state?.key;
                  if (prevLocation === "oblig") {
                    handleUpdateState();
                    onInputValueChanged &&
                      onInputValueChanged(
                        getValue
                          ? getValue?.label + " " + getValue?.value + " " + getValue?.code
                          : "",
                        false
                      );
                  } else {
                    onInputValueChanged &&
                      onInputValueChanged(value, value.length >= minRequiredCharacters);
                  }
                  setInputValue(value);
                  setLabelSelected(
                    value
                  );
                }}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option
                  } else {
                    return option.value
                  }
                }
                }
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props} style={{ marginBottom: '15px', paddingRight: '0' }}  >
                      <Grid container justifyContent={'flex-start'} alignItems='Center' gap={"5px"} wrap="nowrap" >
                        <Grid sx={{ height: '40px', width: '40px' }}>
                          <img style={{ width: '100%', height: '100%' }} src={option.iconImg} alt={option.nameIcon} />
                        </Grid>
                        <Grid container direction={'column'} alignItems='flex-start' gap={'5px'}>
                          <span style={{ fontSize: '10px' }}>{option.label + " " + option.nameIcon}</span>
                          <span style={{ fontSize: '20px' }}>{option.value}</span>
                        </Grid>
                      </Grid>

                    </li>
                  )
                }}
                loadingText="loading"
                onChange={(event, option, reason) => {
                  if (reason === "clear") {
                    //  setSelectedOption(null);
                  } else {
                    //  setSelectedOption(option);
                    // setOpenSheet(false);
                    if (typeof option === "string") {
                      setLabelSelected(
                        option
                      );
                    } else {
                      setLabelSelected(
                        option?.value
                      );
                    }
                  }
                    freeSolo ? null: setOpenSheet(false)
                  onOptionSelected && onOptionSelected(option);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={
                      autoRef
                    }
                    {...register(name, {
                      onChange: (e) => {
                        setInputValue(e.target.value);
                      },
                      onBlur: handleBlur
                    })}
                    variant="outlined"
                    // onFocus={handleFocus}
                    InputProps={{
                      ...params.InputProps,
                      sx: { borderRadius: '8px', height: "48px", color: theme.palette.grey[300] },
                      endAdornment: (
                        <Fragment>
                          {/* {loading ? (
                            <CircularProgress
                              color="inherit"
                              size={20}
                            />
                          ) : null} */}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
              />

              <Grid>
                {freeSolo ? (confirmButtonShow && <LoadingButton onClick={() => setOpenSheet(false)} sx={{ width: '100%', mb: '16px' }} >
                  {t("Continue")}
                </LoadingButton>) : null}
              </Grid>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>
      </FormControl>
    </>
  );
}
