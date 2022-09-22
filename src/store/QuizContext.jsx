import React, { useState, useEffect, useCallback } from 'react';
import randomNumber from '../utils/randomNumber';

export const QuizContext = React.createContext();

export const QuizProvider = ({ children }) => {
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [answer, setAnswer] = useState();
  const [score, setScore] = useState();
  const [gameEnd, setGameEnd] = useState(false);
  const [time, setTime] = useState();
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    const res = num1 + num2;

    setNumber1(num1);
    setNumber2(num2);
    setAnswer(res);
    setTimeUp(false);
  }, [score, gameEnd, timeUp]);

  const checkAnswer = useCallback(
    
  )

  return (
    <QuizContext.Provider
      value={{
        number1,
        number2,
        score,
        checkAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
