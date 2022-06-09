const helpers = (() => {
  const randomGuess = (array) => {
    let random = array[Math.floor(Math.random() * array.length)];
    return random;
  };

  return { randomGuess };
})();
export { helpers };
