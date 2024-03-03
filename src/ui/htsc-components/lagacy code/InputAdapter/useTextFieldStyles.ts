import { useMemo } from 'react';

const useTextFieldStyles = ({theme, success, size}: StyelHook) => {
  return useMemo(() => {
    return {
      "& .MuiOutlinedInput-root": {
        height: size === "md" ? "48px" : "56px",

        "&.Mui-focused fieldset": {
          borderWidth: "2px",
        //  borderColor: success ? theme.palette.success[400] : theme.palette.info.main
        }
      },
      "& .MuiOutlinedInput-root fieldset": {
        borderWidth: success ? "2px" : "1px",
     //   borderColor: success ? theme.palette.success[400] : theme.palette.info.main
      },
      "& .MuiFormLabel-root": {
      //  color: theme.palette.grey[300],

        "&.Mui-focused": {
      //    color: theme.palette.grey[400]
        },
        "&.Mui-error": {
      //    color: theme.palette.grey[400]
        }
      }
    };
  }, [success, theme, size]);
};

export default useTextFieldStyles;
