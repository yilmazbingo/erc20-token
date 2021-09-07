import React, { useState, useEffect } from "react";

const Airdrop = (props) => {
  console.log("props in Airdrop", props);
  const [timeState, setTimeState] = useState({ time: {} });
  const [airdropTime, setAirdropTime] = useState(10);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timeLeftVar = secondsToTime(airdropTime);
    console.log("timelfetvar", timeLeftVar);
    setTimeState((prevState) => ({ ...prevState, time: timeLeftVar }));
    if (airdropTime === 0) {
      console.log("airdrip time iszero");
      clearInterval(timer);
    }
  }, [airdropTime]);

  // this will start the timer
  const airdropReleaseTokens = () => {
    let stakingB = props.stakingBalance;
    if (stakingB >= "50000000000000000000") {
      startTimer();
    }
  };
  // each secon state count down will be called and state will be updated
  const startTimer = () => {
    if (timer === 0 && airdropTime > 0) {
      setTimer(setInterval(countDown, 1000));
    }
  };

  const countDown = () => {
    setTimeState((prevState) => ({
      ...prevState,
      time: secondsToTime(airdropTime),
    }));

    setAirdropTime((prevState) => prevState - 1);
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

  airdropReleaseTokens();

  return (
    <div style={{ color: "black" }}>
      {timeState.time.m}:{timeState.time.s}
    </div>
  );
};

export default Airdrop;
