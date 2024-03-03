import { HTMLAttributes, ReactNode } from "react";

export type Props<T> = {
  selectOptions: T[];
  renderOption?: (props: HTMLAttributes<HTMLLIElement>, option: T | string) => ReactNode;
  loading?: boolean;
  label: string;
  freeSolo?: boolean;
  isOptionEqualToValue: (option: T, value: T) => boolean;
  valueToShowToInput: (option: T) => { text: string; icon?: ReactNode };
  valueToSendToServiceOnChange: (event: React.SyntheticEvent, newValue: T) => string;
  onChangeValue: (value: string) => void;
  onPoperOpen?: () => void;
  onPoperclose?: () => void;
  hasConfirmButton?: boolean;
  muiAutoCompleteProps?: object;
  muiButtonProps?: object;
  isRequired?: boolean;
  isCart?: boolean;
  startIcon?: ReactNode;
  minRequiredCharacters?: number;
  onInputValueChanged?: (value: string, hasReachedMinRequiredCharacters: boolean) => void;
  error?: boolean;
  helperText?: string
};
