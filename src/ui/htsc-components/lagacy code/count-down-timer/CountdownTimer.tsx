import { useCountDownTimer } from "ui/htsc-components/count-down-timer/useCountDownTimer";
import React, { useEffect } from "react";

export type Props = {
  timerInSeconds: number | undefined;
  onCountDownStarted?: () => void;
  onCountDownEnded?: () => void;
};

const CountDownTimer = ({
  timerInSeconds,
  onCountDownStarted,
  onCountDownEnded
}: Props) => {
  const { countDownTimer, setCountDownTimer, isTimerCounting } = useCountDownTimer({
    initialValue: timerInSeconds,
    onCountDownStarted: onCountDownStarted,
    onCountDownEnded: onCountDownEnded
  });

  useEffect(() => {
    if (timerInSeconds === undefined) {
      return;
    }
    setCountDownTimer(timerInSeconds);
  }, [timerInSeconds]);

  return (
    <span style={{color: '#fff'}} className={`px-2 ${!isTimerCounting ? "hidden" : ""}`}>
      {beautifyTime(countDownTimer ?? 0)}
    </span>
  );
};

const beautifyTime = (time: number): string => {
  let minutes = Math.floor(time / 60).toString();
  let seconds = Math.floor(time % 60).toString();

  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }

  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  return `${minutes}:${seconds}`;
};

export default CountDownTimer;