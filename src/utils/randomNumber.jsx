// import react, { useState } from 'react';

export default (lowerLimit, upperLimit) => {
  // const [level, setLevel] = useState(0);
  // const upperLimit = maxLimit * (level * 10);
  // console.log(`Level: ${level}`);
  return Math.floor(Math.random() * upperLimit) + lowerLimit;
};
