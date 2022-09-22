import react, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import randomNumber from './utils/randomNumber';

import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    const num1 = randomNumber(1, 10);
    const num2 = randomNumber(1, 10);
    const res = num1 + num2;

    setNumber1(num1);
    setNumber2(num2);
    setAnswer(res);
  }, []);

  const handleChange = (e) => {
    console.log('You typed numbers!');
  };

  const handleSubmit = (e) => {
    console.log(`Your answer: ${userAnswer}, ${typeof userAnswer}`);
    console.log(`The correct answer is: ${answer}, ${typeof answer}`);
    e.preventDefault();
    if (userAnswer === answer) {
      console.log('You got it correct!');
      setScore(score + 1);
      const num1 = randomNumber(1, 10);
      const num2 = randomNumber(1, 10);
      const res = num1 + num2;

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

  return (
    <div className="App">
      <div>Timer</div>
      <h1>
        {number1}
        {'+'}
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
    </div>
  );
}
