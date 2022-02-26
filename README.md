# HANGMAN GAME

- Backend part of the hangman game.
- Frontend part of the hangman game can be found in the [Github](https://github.com/Shubham-Mi/hangman-game) repository.

<br></br>

# Database description

- The database is a SQLite database.
- There are five tables named **Words**, **Players**, **GuestPlays**, **SingleGames** and **GameSessions**.
- All the table creation queries can be found in [Queries.sql](Queries.sql) file.
- The **Words** table contains a list of all the words along with a difficulty level assigned to them. There are currently 1129 total words in the database, out of which 296 are easy, 632 are medium and 201 hard words. The list of words can be found in [words.txt](words.txt) file.
  | Column Name | Data Type |
  | --- | --- |
  | Id | int |
  | Title | varchar |
  | Difficulty | int |
- The **Players** table contains information of all the registered players. The password of each player is stored as a hash and salt.
  | Column Name | Data Type |
  | --- | --- |
  | Id | int |
  | Player Name | varchar |
  | Password | varchar |
  | Salt | varchar |
- The **GuestPlays** table contains information regarding the games that were played by players who are not registered in the **Players** table.
  | Column Name | Data Type |
  | --- | --- |
  | Id | int |
  | Player Name | varchar |
  | Played Letters | varchar |
  | Started At | datetime |
  | Ended At | datetime |
  | WordId | Foreign Key (Word) |
- the **SingleGames** table contains inforomation regarding individual games played by registered players.
  | Column Name | Data Type |
  | --- | --- |
  | Id | int |
  | Played Letters | varchar |
  | Ended At | datetime |
  | WordId | Foreign Key (Word) |
  | Game Session | Foreign Key (Game Sessions) |
- The **GameSessions** table contains information regarding the game sessions played by registered players. A single game session can have atmost 10 single games in it.
  | Column Name | Data Type |
  | --- | --- |
  | Id | int |
  | Current Level | int |
  | Started At | datetime |
  | Ended At | datetime |
  | Player Id | Foreign Key (Player) |

<br></br>

# APIs description

- The API is a REST API.
- There are primarily four endpoints:

  - /api/guestplay -> To play as a [guest](#guest-play-api)
  - /api/authentiation -> To [authenticate](#authentication-api) registered players
  - /api/sessions -> To create [game sessions](#game-sessions-api)
  - /api/leaderboard -> to check out the [leaderboard](#leaderboard-api)

<br></br>

## Guest Play API

- There are two endpoint in **Guest Play API**.
- The Guest API returns the following data:
  | Column Name | Data Type | Description |
  | --- | --- | --- |
  | Id | int | Game Id |
  | LivesLeft | int | No of lives levt (0-6) |
  | result | boolean | Whether the game has ended or not |
  | Masked Word | Array of char | Word to be displayed to player |
  | playedLetters | varchar | Letters played by the player |

- ### "/" endpoint

  This endpoint creates a new **Guest Game** and associates a **Word** to the game.

- ### "/:id/play" endpoint

  This endpoint plays a letter (a-z) in the **Guest Game** with GameId "id" which is extracted from the url.

<br></br>

## Authentication API

- There are two endpoints in **Authentication API**.
- The Authentication API returns the following data:
  | Column Name | Data Type | Description |
  | --- | --- | --- |
  | Id | int | Player Id |
  | Name | varchar | Player Name |

- ### "/" endpoint
  This endpoint registers a players to the database. It adds a name which should be unique for each player and divided the password into salt and hash values.
- ### "/authenticate" endpoint
  This endpoint takes a name and password as input and find out whether it matches with the user database.

<br></br>

## Game Sessions API

- There are three endpoint in **Game Session API**.
- The Game Session API returns the following data:
  | Column Name | Data Type | Description |
  | --- | --- | --- |
  | Id | int | Game Id |
  | LivesLeft | int | No of lives levt (0-6) |
  | result | boolean | Whether the game has ended or not |
  | Masked Word | Array of char | Word to be displayed to player |
  | playedLetters | varchar | Letters played by the player |

- ### "/" endpoint

  This endpoint creates a new **Game Session** for the registerred players. And then creates a **Single Game** associated with that **Game Session**.

- ### "/:id/play" endpoint

  This endpoint plays a letter (a-z) in the **Single Game** with GameId "id" which is extracted from the url.

- ### "/:id/nextlevel" endpoint

  This endpoint creates a new **Single Game** associated with the **Game Session** with GameSessionId "id" which is extracted from the url.

<br></br>

## Leaderboard API

- There is one endpoint in **Leaderboard API**.
- The leaderboard API returns the following data:
  | Column Name | Data Type | Description |
  | --- | --- | --- |
  | Position | int | Leaderboard Position (1-10) |
  | Player | varchar | PLayer Name |
  | Level | int | Levels player reached (1-10) |

- ### "/" endpoint
  This endpoint returns a list of top 10 players.
