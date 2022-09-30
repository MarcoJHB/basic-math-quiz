import react, { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import randomNumber from './utils/randomNumber';
import { db } from './components/Firebase';
import { v4 as uuid } from 'uuid';
import { addDoc, collection, onSnapshot } from '@firebase/firestore';
import './App.css';
import { uuidv4 } from '@firebase/util';

export default function App() {
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);
  const [highscores, setHighscores] = useState([]);
  // const [showScore, setShowScore] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const [maxDigits, setMaxDigits] = useState(10);
  const [operator, setOperator] = useState(0);
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [answer, setAnswer] = useState(0);
  const [level, setLevel] = useState(1);
  const [userAnswer, setUserAnswer] = useState('');
  const [userName, setUserName] = useState('');
  const [userLink, setUserLink] = useState('');
  const [numberOperators, setNumberOperators] = useState(1);
  const totalOperators = numberOperators;
  const highestNumber = maxDigits;
  const newOperator = operator;
  // Countdown Timer Code
  const START_TIME = 5;
  const START_TIME_MS = START_TIME * 100;
  const [timer, setTimer] = useState(START_TIME_MS);
  const [endGame, setEndGame] = useState(false);
  const [hideQuestionAnswer, setHideQuestionAnswer] = useState(true);
  const isStartGame = hideQuestionAnswer;
  const showHighscores = showScores;
  const isGameOver = endGame;
  const id = useRef(null);
  const ref = useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };

  const levelUp = level;

  // Firebase Data
  const scoreRef = useRef();
  // const collRef = collection(firestore, 'scores');

  useEffect(() => {
    const collRef = collection(db, 'scores');

    const subscriber = onSnapshot(collRef, (querySnapshot) => {
      let getScoresFromFirebase = [];
      querySnapshot.forEach((doc) => {
        getScoresFromFirebase.push({ ...doc.data(), key: doc.id });
      });
      let getSortedScoresFromFirebase = [...getScoresFromFirebase].sort(
        (a, b) => parseFloat(b.score) - parseFloat(a.score)
      );
      setHighscores(getSortedScoresFromFirebase);
    });

    // has a return value of a cleanup value - so this is the cleanup function
    return () => subscriber();
  }, []); // empty dependencies array

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
    const newOperator = Math.floor(Math.random() * totalOperators);
    return setOperator(newOperator);
  }

  // Add More time to correct answer

  const moreTime = () => {
    setTimer((time) => time + 100);
  };

  // Start Game and Timer on Click

  const handleStart = () => {
    setMaxDigits(highestNumber);
    const num1 = randomNumber(2, highestNumber);
    const num2 = randomNumber(2, highestNumber);
    const newOperator = Math.floor(Math.random() * 3);
    setOperator(newOperator);
    setNumber1(num1);
    setNumber2(num2);
    if (newOperator === 0) {
      const res = num1 + num2;
      setAnswer(res);
    } else if (newOperator === 1) {
      const res = num1 - num2;
      setAnswer(res);
    } else if (newOperator === 2) {
      const res = num1 * num2;
      setAnswer(res);
    } else {
      const res = num1 / num2;
      setAnswer(res);
    }
    // chosenOperator();
    setQuestionCount(1);

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
    setNumberOperators(1);
    setUserAnswer('');
    setEndGame(false);
    setShowScores(false);
    setHideQuestionAnswer(true);
    setTimer(START_TIME_MS);
    setScore(0);
  };

  // Submit Name
  // After name entry, show high score screen
  // [Future] - If score doesn't make the top 10, show - "Play again to reach the high score!"
  // If score is greater than the 10th highest score, ask for name and then display scores.

  const handleSubmitName = (e) => {
    e.preventDefault();
    // Data map
    const collRef = collection(db, 'scores');

    console.log(`Final Score: ${score}`);
    let data = {
      username: userName,
      userlink: userLink,
      score: score,
    };
    try {
      addDoc(collRef, data);
    } catch (e) {
      console.log(e);
    }
    setShowScores(true);
  };

  // Submit Answer
  // If Correct, add 3 seconds to the game, + 1 point
  // If Incorrect, add 0 seconds to the game, + 0 point

  const handleSubmit = (e) => {
    e.preventDefault();
    //CORRECT ANSWER
    if (parseInt(userAnswer) === answer) {
      setScore(score + 1);

      const num1 = randomNumber(2, highestNumber);
      const num2 = randomNumber(2, highestNumber);
      const newOperator = Math.floor(Math.random() * numberOperators);

      setOperator(newOperator);
      if (newOperator === 0) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 + num2;
        setAnswer(res);
      } else if (newOperator === 1) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 - num2;
        setAnswer(res);
      } else if (newOperator === 2) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 * num2;
        setAnswer(res);
      } else {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 / num2;
        setAnswer(res);
      }
      setNumber1(num1);
      setNumber2(num2);

      moreTime();
    }

    // INCORRECT ANSWER
    else {
      const num1 = randomNumber(2, highestNumber);
      const num2 = randomNumber(2, highestNumber);
      const newOperator = Math.floor(Math.random() * 3);
      setOperator(newOperator);

      if (newOperator === 0) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 + num2;
        setAnswer(res);
      } else if (newOperator === 1) {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 - num2;
        setAnswer(res);
      } else {
        setNumber1(num1);
        setNumber2(num2);
        const res = num1 * num2;
        setAnswer(res);
      }
    }

    setUserAnswer('');
    setQuestionCount(questionCount + 1);
    if (questionCount % 10 === 0) {
      setNumberOperators(numberOperators + 1);
    }
  };

  useEffect(() => {
    if (!hideQuestionAnswer) {
      ref.current.focus();
    }
  }, [hideQuestionAnswer]);

  return (
    <div className="App">
      {/* // GAME OVER SCREEN // When Time reaches zero, show final score and input for name // On
      submit, display names and scores */}
      {isGameOver ? (
        <div>
          <h1>Times up!</h1>
          <h2>Final Score</h2>
          <h3>{score}</h3>

          {showHighscores ? (
            <>
              {' '}
              <h4>High Scores</h4>
              <ol>
                {highscores
                  .map((scores) => (
                    <li key={scores.key}>
                      <a href={scores.userlink}>{scores.username}</a>
                      {' - '}
                      {scores.score}
                    </li>
                  ))
                  .slice(0, 10)
                  .sort((a, b) => a - b)}
              </ol>
              <button onClick={handleReset}>Play Again!</button>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmitName}>
                <input
                  placeholder="Enter your name"
                  value={userName}
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  placeholder="GitHub Profile Link / Twitter handle / Leave Blank"
                  value={userLink}
                  type="url"
                  onChange={(e) => setUserLink(e.target.value)}
                />
                <button type="submit">View Scores</button>
              </form>
            </>
          )}
        </div>
      ) : (
        <>
          <h1>Test Yo Math!</h1>
          <p style={!isStartGame ? { display: 'none' } : { display: '' }}>
            Answer basic arithmetic questions within the time limit!
          </p>
          <h2>Time left: {formatTime(timer)}</h2>
          <h3>Level: {level}</h3>
          <button
            onClick={handleStart}
            style={!isStartGame ? { display: 'none' } : { display: '' }}
          >
            Start!
          </button>
          <h1
            className="question"
            style={isStartGame ? { visibility: 'hidden' } : { visibility: '' }}
          >
            {number1}
            {newOperator === 0 ? '+' : newOperator === 1 ? '-' : newOperator === 2 ? 'x' : '/'}
            {number2}
          </h1>
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
      <p className="footer-link">
        🔗 <a href="https://marcocodo.com/">marcocodo</a>
      </p>
    </div>
  );
}
