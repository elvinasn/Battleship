const helpers = (() => {
  const randomGuess = (array) => {
    let random = array[Math.floor(Math.random() * array.length)];
    return array.splice(random, 1);
  };

  return { randomGuess };
})();
export { helpers };
