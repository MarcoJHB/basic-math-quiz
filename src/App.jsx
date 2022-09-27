import react, { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import randomNumber from './utils/randomNumber';

import './App.css';

export default function App() {
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [maxDigits, setMaxDigits] = useState(10);
  const [operator, setOperator] = useState(0);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [answer, setAnswer] = useState(0);
  const [level, setLevel] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const highestNumber = Math.pow(maxDigits, level);
  const newOperator = operator;
  // Countdown Timer Code
  const START_TIME = 30;
  const START_TIME_MS = START_TIME * 100;
  const [timer, setTimer] = useState(START_TIME_MS);
  const [endGame, setEndGame] = useState(false);
  const [hideQuestionAnswer, setHideQuestionAnswer] = useState(true);
  const isStartGame = hideQuestionAnswer;
  const isGameOver = endGame;
  const id = useRef(null);
  const ref = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };

  const levelUp = level;

  useEffect(() => {
    if (timer === 0) {
      clear();
      setEndGame(true);
    }
  }, [timer]);

  const formatTime = (timer) => {
    const result = new Date(timer * 10).toISOString().slice(14, 22);

    return `${result} `;
  };

  function chosenOperator() {
    const newOperator = Math.floor(Math.random() * 3);
    console.log(`0 = x, 1 = -, 2 = +, so this is ${newOperator}`);
    return setOperator(newOperator);
  }

  // Add More time to correct answer

  const moreTime = () => {
    setTimer((time) => time + 100);
  };

  // Random Q&A on load

  // useEffect(() => {
  //   chosenOperator();
  //   console.log(`On start, operator will be ${operator}`);
  //   // setAnswer(res);
  // }, []);

  // Start Game and Timer on Click

  const handleStart = () => {
    setMaxDigits(highestNumber);
    const num1 = randomNumber(2, highestNumber);
    const num2 = randomNumber(2, highestNumber);
    const newOperator = Math.floor(Math.random() * 3);
    setOperator(newOperator);
    setNumber1(num1);
    setNumber2(num2);
    console.log(newOperator);
    if (newOperator === 0) {
      const res = num1 * num2;
      setAnswer(res);
      console.log(`Time to *, answer is ${res}`);
    } else if (newOperator === 1) {
      const res = num1 - num2;
      console.log(`Time to -, answer is ${res}`);
      setAnswer(res);
    } else {
      const res = num1 + num2;
      setAnswer(res);
      console.log(`Time to +, answer is ${res}`);
    }
    // chosenOperator();
    setQuestionCount(1);
    console.log(`You're on Q${questionCount}, using a ${operator}`);

    setLevel(1);
    setHideQuestionAnswer(false);
    setEndGame(false);
    ref.current.focus();
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 10);
    return () => clear();
  };

  // Reset Game, but don't start the timer yet

  const handleReset = () => {
    chosenOperator();

    setEndGame(false);
    setHideQuestionAnswer(true);
    setTimer(START_TIME_MS);
  };

  // Submit Answer
  // If Correct, add 3 seconds to the game, + 1 point
  // If Incorrect, add 0 seconds to the game, + 0 point

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`User anwswer: ${parseInt(userAnswer)}, correct answer is ${answer}`);
    //CORRECT ANSWER
    if (parseInt(userAnswer) === answer) {
      console.log('Correct!');

      setScore(score + 1);

      const num1 = randomNumber(2, highestNumber);
      const num2 = randomNumber(2, highestNumber);
      const newOperator = Math.floor(Math.random() * 3);

      setOperator(newOperator);
      if (newOperator === 0) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 * num2;
        setAnswer(res);
        console.log(`Time to *, answer is ${res}`);
      } else if (newOperator === 1) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 - num2;
        setAnswer(res);
        console.log(`Time to -, answer is ${res}`);
      } else {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 + num2;
        setAnswer(res);
        console.log(`Time to +, answer is ${res}`);
      }
      setNumber1(num1);
      setNumber2(num2);

      moreTime();
      // setNumber1(num1);
      // setNumber2(num2);
      // setAnswer(res);
    }

    // INCORRECT ANSWER
    else {
      console.log('Incorrect!');

      const num1 = randomNumber(2, highestNumber);
      const num2 = randomNumber(2, highestNumber);
      const newOperator = Math.floor(Math.random() * 3);
      setOperator(newOperator);

      if (newOperator === 0) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 * num2;
        setAnswer(res);
      } else if (newOperator === 1) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 - num2;
        setAnswer(res);
      } else {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 + num2;
        setAnswer(res);
      }
    }

    setUserAnswer('');
    setQuestionCount(questionCount + 1);
    console.log(`You're on Q${questionCount}`);
    if (questionCount % 10 === 0) {
      setLevel(level + 1);
      // setMaxDigits(maxDigits * level);
      console.log(`Level: ${level}. Highest No is: ${highestNumber}`);
    }

    // SET NEW OPERATOR ONCE - DON'T KEEP DOING IT AGAIN
    // const newOperator = Math.floor(Math.random() * 3);
    // setOperator(newOperator);
    // console.log(`CHOSEN OPERATOR IS ${newOperator}, answer is ${answer}`);
  };

  useEffect(() => {
    if (!hideQuestionAnswer) {
      ref.current.focus();
    }
  }, [hideQuestionAnswer]);

  return (
    <div className="App">
      {isGameOver ? (
        <div>
          <h1>Times up!</h1>
          <h2>Final Score</h2>
          <h3>{score}</h3>
          <button onClick={handleReset}>Play Again!</button>
        </div>
      ) : (
        <>
          <h1>Test Yo Math!</h1>
          <h2>Time left: {formatTime(timer)}</h2>
          <h3>Level: {level}</h3>
          <button
            onClick={handleStart}
            style={!isStartGame ? { visibility: 'hidden' } : { visibility: '' }}
          >
            Start!
          </button>
          <p
            className="question"
            // style={isStartGame ? { visibility: 'hidden' } : { visibility: '' }}
          >
            {number1}
            {newOperator === 0 ? 'x' : newOperator === 1 ? '-' : '+'}
            {number2}
          </p>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                disabled={isStartGame ? true : false}
                ref={ref}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </form>
            <p className="score">
              Score: <span className="score-value">{score}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
