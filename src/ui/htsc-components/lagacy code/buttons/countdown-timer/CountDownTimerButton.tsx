import React, { useState } from "react";
import LoadingButton from "ui/htsc-components/buttons/loading-button/LoadingButton";
import CountDownTimer from "ui/htsc-components/count-down-timer/CountdownTimer";
export enum variant {
  outlined = "outlined",
  contained = "contained"
}

export type Props = {
  timerInSeconds: number | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
  text?: string;
  buttonVariant?: variant | undefined;
};

const CountDownTimerButton = ({
  timerInSeconds,
  onClick,
  isDisabled,
  className,
  text,
  buttonVariant
}: Props) => {
  const [isCountDownTimerCounting, setIsCountDownTimerCounting] =
    useState<boolean>(false);

  return (
    <LoadingButton
      buttonVariant={buttonVariant}
      onClick={(event) => {
        onClick && onClick(event);
      }}
      className={className}
      loading={isCountDownTimerCounting || isDisabled}
      loadingPosition="end"
      disabled={isCountDownTimerCounting || isDisabled}
    >
      {!isCountDownTimerCounting && text}
      <CountDownTimer
        timerInSeconds={timerInSeconds}
        onCountDownStarted={() => {
          setIsCountDownTimerCounting(true);
        }}
        onCountDownEnded={() => {
          setIsCountDownTimerCounting(false);
        }}
      />
    </LoadingButton>
  );
};

export default CountDownTimerButton;
