import react, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import randomNumber from './utils/randomNumber';
import useTimer from './hooks/Timer';
import { formatTime } from './utils/formatTime';

import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const { timer, isActive, handleStart, handleMoreTime, handleReset } = useTimer(0);

  useEffect(() => {
    const num1 = randomNumber(5, 20);
    const num2 = randomNumber(5, 20);
    const res = num1 * num2;

    setNumber1(num1);
    setNumber2(num2);
    setAnswer(res);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log(`Final Score: ${score}`);
      clearInterval(countRef.current);
      setIsActive(false);
      setShowScore(true);
    }
  }, []);

  const handleChange = (e) => {
    console.log('You typed numbers!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer === answer) {
      setScore(score + 1);
      const num1 = randomNumber(5, 20);
      const num2 = randomNumber(5, 20);
      const res = num1 * num2;
      handleMoreTime(3);
      setNumber1(num1);
      setNumber2(num2);
      setAnswer(res);
    } else {
      console.log('Wrong answer!');
    }
    setUserAnswer('');
  };

  const componentDidMount = () => {
    userAnswer.focus();
  };

  console.log(timer);

  return (
    <div className="App">
      {timer === 0 ? (
        <div>
          <h2>Final Score</h2>
          <h3>{score}</h3>
        </div>
      ) : (
        <>
          <div>{formatTime(timer)}</div>
          <button onClick={handleStart}>Start!</button>
          <h1>
            {number1}
            {'x'}
            {number2}
          </h1>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(parseInt(e.target.value))}
                autoFocus
              />
              <input type="submit" />
            </form>
            <p className="read-the-docs">Answer: </p>
            <p className="read-the-docs">Score: {score}</p>
          </div>
        </>
      )}
    </div>
  );
}
