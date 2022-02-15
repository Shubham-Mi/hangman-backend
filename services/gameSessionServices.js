const { calculateLivesLeft } = require("../utilities/gameFunctions");
const { GameSession } = require("../models");

async function markGameCompleted(SingleGame) {
  const gameSessionWord = await SingleGame.getWord();
  const actualWord = gameSessionWord.title;
  const playedLetters = SingleGame.playedLetters.split("");
  const word_set = new Set([...actualWord]);
  const played_set = new Set([...playedLetters]);

  const isWon = [...word_set].reduce((acc, curr) => {
    if (!played_set.has(curr)) return false;
    return acc;
  }, true);

  const lives = await calculateLivesLeft(SingleGame);

  if (lives === 0 || isWon) {
    SingleGame.endedAt = new Date();
    await SingleGame.save();

    if (lives === 0) {
      const gameSessionId = SingleGame.gameSessionId;
      const gameSession = await GameSession.findByPk(gameSessionId);
      gameSession.endedAt = new Date();
      await gameSession.save();
    }
  }
}

async function playLetterInGameSession(SingleGame, letter) {
  const playedLetters = SingleGame.playedLetters.split("");
  const playedSet = new Set([...playedLetters]);

  if (playedSet.has(letter)) {
    return;
  }

  playedLetters.push(letter);
  SingleGame.playedLetters = playedLetters.join("");
  await SingleGame.save();
  await markGameCompleted(SingleGame);
}

module.exports = {
  playLetterInGameSession,
};
