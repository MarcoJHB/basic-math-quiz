export const formatTime = (timer) => {
  //   const getMiliseconds = `0${timer}`.slice(-2);
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  return `${getMinutes} : ${getSeconds} `;
};
