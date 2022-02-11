# HANGMAN GAME

- Backend part of the hangman game.
- Frontend part of the hangman game can be found in the [Github](https://github.com/Shubham-Mi/hangman-game) repository.

## Database description

- The database is a SQLite database.
- There are teo tables named _game_sessions_ and _words_.
- The **_words_** table contains a list of all the words that are to be guessed.
- The **_game_sessions_** table information about all the games that have been played.

## APIs description

- The API is a RESTful API.
- At "/api/sessons" endpoint, the API returns a newly created game sesson.
- At "/api/sessions/<session_id>/play" endpoint, the API returns the game session with the given session id after playinig the selected alphabet.
- The API is returned in the following format:

```
  {
    id: id,
    livesLeft: lives,
    result: !!GameSession.endedAt,
    maskedWord: maskedWordArray,
    playedLetters: GameSession.playedLetters,
  }

```
