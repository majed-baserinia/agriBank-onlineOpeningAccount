import React from "react";
import { MatButton } from "./StyledButton";

type ButtonProps = {
  text?: string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  variant: any;
};

function Button({ text, disabled = false, className, onClick, variant }: ButtonProps) {
  return (
    <MatButton
      fullWidth
      classes={{
        root: `disabled:!cursor-not-allowed disabled:!bg-green-900 disabled:!pointer-events-auto ${className}`
      }}
      variant={variant}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {text}
    </MatButton>
  );
}

export default Button;
