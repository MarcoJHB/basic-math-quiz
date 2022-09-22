import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';

import { QuizContext } from '../store/QuizContext';

export const Question = () => {
  const { number1, number2 } = useContext(QuizContext);

  return useMemo(() => {
    return (
      <h1 className="question">
        <span>{number1}</span>
        {'+'}
        <span>{number2}</span>
        {'= ?'}
      </h1>
    );
  }, [number1, number2]);
};
