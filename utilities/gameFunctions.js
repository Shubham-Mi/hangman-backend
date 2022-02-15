const MAX_LIVES = 6;

async function calculateLivesLeft(SingleGame) {
  const gameWord = await SingleGame.getWord();
  const actualWord = gameWord.title;
  const playedLetters = SingleGame.playedLetters.split("");
  const wordSet = new Set([...actualWord]);

  const wrongLetters = playedLetters.filter((letter) => {
    return !wordSet.has(letter);
  });

  const livesLeft = MAX_LIVES - wrongLetters.length;

  return livesLeft;
}

async function calculateMaskedWord(SingleGame) {
  const gameWord = await SingleGame.getWord();
  const actualWord = gameWord.title;
  const playedLetters = SingleGame.playedLetters.split("");
  const played_set = new Set([...playedLetters]);

  const maskedWord = [...actualWord].map((letter) =>
    played_set.has(letter) ? letter : "_"
  );

  return maskedWord;
}

async function calculateDifficulty(level) {
  if (level < 4) {
    return 1;
  } else if (level < 7) {
    return 2;
  } else {
    return 3;
  }
}

module.exports = {
  calculateLivesLeft,
  calculateMaskedWord,
  calculateDifficulty,
};
