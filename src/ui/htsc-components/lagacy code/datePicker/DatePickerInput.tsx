import { CalendarToday } from "@mui/icons-material";
import { FormControl, InputAdornment, useTheme } from "@mui/material";
import React, { useState } from "react";
import gregorian from "react-date-object/calendars/gregorian";
import persian from "react-date-object/calendars/persian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import InputMask from "react-input-mask";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/colors/yellow.css";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
import { MatInputLabel, MatOutlinedInput } from "./StyledDatePicker";

interface InputMaskProps {
  value?: string;
  dateError?: boolean;
  handleValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValue: (value: string) => void;
  openCalendar?: () => void;
  isRequired?: boolean;
  label?: string;
}

function InputMaskDatePicker({
  value,
  handleValueChange,
  handleValue,
  dateError,
  openCalendar,
  isRequired,
  label
}: InputMaskProps) {
  const settings = useInitialSettingStore((s) => s.setting);
  const [isFocused, setIsFocused] = useState(false);

  const theme = useTheme();

  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishNumbers = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g];

  const fixNumbers = (str: string, lang: string) => {
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str
          .replace(persianNumbers[i], i.toString())
          .replace(englishNumbers[i], i.toString());
        if (!!str) {
          handleValue(str);
        }
      }
    }
    return str;
  };

  const valueFinal =
    value != undefined && value != null
      ? fixNumbers(value.toString(), settings.language)
      : null;

  interface MaskedStateChange {
    nextState?: any;
  }

  function beforeMaskedStateChange({ nextState }: MaskedStateChange) {
    let { value } = nextState;

    if (value.endsWith("/")) {
      value = value.slice(0, -1);
    }

    return {
      ...nextState,
      value
    };
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <MaterialThemeProvider>
      <InputMask
        mask="9999/99/99"
        value={valueFinal as string}
        onChange={handleValueChange}
        onFocus={openCalendar}
        beforeMaskedStateChange={beforeMaskedStateChange}
      >
        <FormControl
          size="small"
          variant="outlined"
          style={{ width: "100%" }}
        >
          {isRequired ? (
            <MatInputLabel
              required
              theme={theme}
              shrink={isFocused}
              htmlFor="date"
            >
              {label}
            </MatInputLabel>
          ) : (
            <MatInputLabel
              theme={theme}
              htmlFor="date"
              shrink={isFocused}
            >
              {label}
            </MatInputLabel>
          )}

          <MatOutlinedInput
            className="w-full"
            classes={{ root: "w-full" }}
            id="date"
            type="tel"
            autoComplete="off"
            error={dateError}
            onFocus={handleFocus}
            endAdornment={
              <InputAdornment position="end">
                <CalendarToday style={{ color: `${theme.palette.secondary.dark}` }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </InputMask>
    </MaterialThemeProvider>
  );
}

interface Props {
  isRequired?: boolean;
  label?: string;
  dateError?: boolean;
  handleValueChange: (value: string) => void;
}

function DatePickerInput({
  handleValueChange,
  isRequired = false,
  label = "",
  dateError = false
}: Props) {
  const settings = useInitialSettingStore((s) => s.setting);

  const [date, setDate] = useState("");

  const handleValue = (event: string) => {
    if (!!event) {
      handleValueChange(event);
    }
  };

  return (
    <DatePicker
      calendar={settings.language === "fa-IR" ? persian : gregorian}
      locale={settings.language === "fa-IR" ? persian_fa : gregorian_en}
      calendarPosition="bottom-center"
      mapDays={({ date }) => {
        let props = { className: "" };
        let isWeekend = date.weekDay.index === 6;
        if (isWeekend) props.className = "highlight highlight-red";
        return props;
      }}
      className={`${settings.themeName === "dark" ? "bg-dark yellow" : "green"}`}
      inputMode="none" //غیرفعال کردن صفحه کلید مجازی
      value={date}
      type={"input_icon"}
      onChange={(date) => {
        if (date) {
          setDate(date.toLocaleString());
        }
      }}
      containerStyle={{ width: "100%" }}
      render={
        <InputMaskDatePicker
          handleValue={(e) => handleValue(e)}
          dateError={dateError}
          isRequired={isRequired}
          label={label}
        />
      }
    />
  );
}

export default DatePickerInput;
