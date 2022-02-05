const MAX_LIVES = 6;

async function calculateLivesLeft(GameSession) {
  const gameSessionWord = await GameSession.getWord();
  const actualWord = gameSessionWord.title;
  const playedLetters = GameSession.playedLetters.split("");
  const wordSet = new Set([...actualWord]);

  const wrongLetters = playedLetters.filter((letter) => {
    return !wordSet.has(letter);
  });

  const livesLeft = MAX_LIVES - wrongLetters.length;

  return livesLeft;
}

async function calculateMaskedWord(GameSession) {
  const gameSessionWord = await GameSession.getWord();
  const actualWord = gameSessionWord.title;
  const playedLetters = GameSession.playedLetters.split("");
  const played_set = new Set([...playedLetters]);

  const maskedWord = [...actualWord].map((letter) =>
    played_set.has(letter) ? letter : "_"
  );

  return maskedWord;
}

module.exports = {
  calculateLivesLeft,
  calculateMaskedWord,
};
