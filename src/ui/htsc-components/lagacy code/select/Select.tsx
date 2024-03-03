import {
  createTheme,
  FormControl,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FieldPath,
  FieldValues,
  UseFormRegister,
  UseFormSetValue
} from "react-hook-form";
import Sheet from "react-modal-sheet";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import { MatInputLabel, MatMenuItem, MatOutlinedInput, MatSelect } from "./StyledSelect";

type Props<TFieldValues extends FieldValues> = {
  register?: UseFormRegister<TFieldValues>;
  setValue?: any;
  name?: FieldPath<TFieldValues>;
  isRequired?: boolean;
  id?: string;
  label?: string;
  className?: string;
  value?: string | number;
  onChange: (value: any) => void;
  maxLength?: number;
  list?: Option[];
};

export interface Option {
  value: string | number;
  label: string;
}

function Select<TFieldValues extends FieldValues>({
  isRequired = false,
  id = "",
  label = "",
  className = "",
  name,
  value,
  list = [],
  onChange,
  maxLength = 0,
  register,
  setValue
}: Props<TFieldValues>) {
  // const settings = useInitialSettingStore((s) => s.setting);

  // const theme = createTheme({
  //   ...settings.themeConfig,
  //   direction: settings.language === "fa-IR" ? "rtl" : "ltr",
  //   typography: {
  //     fontFamily: settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
  //   }
  // });
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const [labelSelected, setLabelSelected] = useState<string>();
  useLayoutEffect(() => {
    if(value==""){
      return; 
    }
    const foundItem = list.find((item)=>{
      
      return  item.value==value;
      
    })
    setLabelSelected(foundItem?.label)
    setValue(name,foundItem?.value )

  }, []);


  const [valueSelected, setValueSelected] = useState<number>();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // const findItemByValue = (e:string) => {
  //   if(e==""){
  //     return; 
  //   }
  //   const foundItem = list.find((item)=>{
      
  //     return  item.value==e;
      
  //   })
  

// return foundItem?.label
   
    
    
  
//   };


  const onInputSelectChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value);
  };
  const onInputSelect = (inputElem: HTMLInputElement) => {
    inputElem.value = inputElem.value.toString().slice(0, maxLength);
  };
  const onInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(valueSelected);
    //setValueSelected(event.)
  };
  return (
    <MaterialThemeProvider>
      {!matches ? (
        <>
          <FormControl
            size="small"
            variant="outlined"
            className="w-full"
          >
            {isRequired ? (
              <MatInputLabel
                required
                theme={theme}
                shrink={isFocused || !!value}
                htmlFor={id}
              >
                {label}
              </MatInputLabel>
            ) : (
              <MatInputLabel
                theme={theme}
                htmlFor={id}
                shrink={isFocused || !!value}
              >
                {label}
              </MatInputLabel>
            )}
            <MatSelect
              {...(register && name
                ? register(name, {
                    onChange: onInputSelectChange,
                    onBlur: handleBlur
                  })
                : { onChange: onInputSelectChange, onBlur: handleBlur })}
              id={id}
              value={value}
              input={
                <MatOutlinedInput
                  theme={theme}
                  id={id}
                  name={name}
                  label={label}
                  type="text"
                  value={value}
                  onFocus={handleFocus}
                  className={className}
                  onInput={(event) => onInputSelect(event.target as HTMLInputElement)}
                />
              }
            >
              {list.map((option: Option) => (
                <MatMenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    }
                  }}
                >
                  {option.label}
                </MatMenuItem>
              ))}
            </MatSelect>
          </FormControl>
        </>
      ) : (
        <>
          <FormControl
            size="small"
            variant="outlined"
            className="w-full"
          >
            {isRequired ? (
              <MatInputLabel
                required
                theme={theme}
                shrink={isFocused || !!value}
                htmlFor={id}
              >
                {label}
              </MatInputLabel>
            ) : (
              <MatInputLabel
                theme={theme}
                htmlFor={id}
                shrink={isFocused || !!value}
              >
                {label}
              </MatInputLabel>
            )}
            <TextField
              onClick={(e) => {
                setOpen(true);
              
              }}
              {...(register && name
                ? register(name, {
                    onChange: onInputChange,//(e) => {

                    //   setValueSelected(e.target.value);
                    // },
                    onBlur: handleBlur
                    
                  })
                : {
                    onBlur: handleBlur
                  })}
              id={id}
             value={labelSelected}
            />

            <Sheet
              isOpen={isOpen}
              onClose={() => setOpen(false)}
            >
              <Sheet.Container
                style={{
                  backgroundColor: theme.palette.background.paper
                }}
              >
                <Sheet.Header />
                <Sheet.Content>
                  {list.map((option: Option) => (
                    <MatMenuItem
                      key={option.value}
                      onClick={() => {
                         setValueSelected(option.value as number);
                        setLabelSelected(option.label);
                        setValue(name,option.value)
                        setOpen(false);
                        setIsFocused(true);
                      }}
                      value={option.value}
                    
                      sx={{
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText
                        }
                      }}
                    >
                      {option.label}
                    </MatMenuItem>
                  ))}
                </Sheet.Content>
              </Sheet.Container>
            </Sheet>
          </FormControl>
        </>
      )}
    </MaterialThemeProvider>
  );
}

export default Select;
