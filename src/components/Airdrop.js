import React, { useState, useEffect } from "react";

const Airdrop = (props) => {
  // props.stakingBalance = "50000000000000000000";
  console.log("props in Airdrop", props);
  const [timeState, setTimeState] = useState({ time: {}, seconds: 20 });
  const [timer, setTimer] = useState(0);
  console.log(timeState.time.s);
  useEffect(() => {
    let timeLeftVar = secondsToTime(timeState.seconds);
    setTimeState((prevState) => ({ ...prevState, time: timeLeftVar }));
  }, []);

  const startTimer = () => {
    if (timer == 0 && timeState.seconds > 0) {
      setTimer(setInterval(countDown, 1000));
    }
  };

  const countDown = () => {
    // 1 . countdown one second at a time
    let seconds = timeState.seconds - 1;
    setTimeState((prevState) => ({
      ...prevState,
      time: secondsToTime(seconds),
      seconds: seconds - 1,
    }));

    // 2. stop counting when we hit zero
    if (seconds == 0) {
      clearInterval(timer);
    }
  };

  const secondsToTime = (secs) => {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  const airdropReleaseTokens = () => {
    let stakingB = props.stakingBalance;
    if (stakingB >= "50000000000000000000") {
      startTimer();
    }
  };
  airdropReleaseTokens();

  return (
    <div style={{ color: "black" }}>
      {timeState.time.m}:{timeState.time.s}
    </div>
  );
};

export default Airdrop;
