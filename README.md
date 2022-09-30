# Test Yo Math - Basic Math Quiz built in React

![alt text](https://github.com/MarcoJHB/basic-math-quiz/blob/main/public/screenshot.jpg 'Quiz Screenshot')

## Overview

This basic app was to improve my React skills, but also my basic arithmetic. I wanted to build something that could help me improve other skills, even while debugging (which happened a lot!).

## Problem

Build an app that could do the following:

1. Create a simple random arithmetic question using 2 random numbers (1-10) and a random math operator (+,-,x)
2. If the user gets the answer correct, increase the score by 1 and add 3 seconds to the clock
3. If the user is incorrect, don't add time or score
4. Every 10 levels, increase the difficulty (e.g. increase the range of the random numbers from 1-100)
5. When the clock hits 0, display the final score
6. Show highscores globally by saving the scores in a database

## Challenges

- Prevent user from typing numbers before the quiz begins
- Focus on the input after the quiz starts, even though it will be disabled in the beginning
- Make sure the operator that is displayed is the same as the one used in the answer
- Increasing the range of random numbers at each stage (each stage is 10 questions)
- Showing a time with milliseconds
- Pushing/pulling data from a database

## Solution

### Easy to use Timer

```javascript
const formatTime = (timer) => {
  const result = new Date(timer * 10).toISOString().slice(14, 22);
  return `${result} `;
};
```

### Increase range every 10 levels

```javascript
if (questionCount % 10 === 0) {
  setLevel(level + 1);
  // console.log(`Level: ${level}. Highest No is: ${highestNumber}`);
}
```

## Future Additions

- Show individual stats
