import { useState, useRef } from 'react';

const START_TIME = 3;

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(START_TIME);
  const [isActive, setIsActive] = useState(false);
  const countRef = useState(null);

  // 1000 ms = 1 second

  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  // On correct answer - add one second

  const handleMoreTime = (extraTime) => {
    countRef.current = setTimer(timer + extraTime);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setTimer(0);
  };

  return { timer, isActive, handleStart, handleReset, handleMoreTime };
};

export default useTimer;
