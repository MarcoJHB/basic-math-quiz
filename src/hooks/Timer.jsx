import { useState, useRef, useEffect } from 'react';

const START_TIME = 1;

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(START_TIME);
  const [isActive, setIsActive] = useState(false);
  const countRef = useState(null);
  let currentTime = 60;
  let timerId = null;
  // 1000 ms = 1 second

  const handleStart = () => {
    function countDown() {
      let currentTime = 60;

      currentTime--;
      timeLeft.textContent = currentTime;

      if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
      }
    }
    let countDownTimerId = setInterval(countDown, 1000);
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
