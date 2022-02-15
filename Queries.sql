-- model/index.js Table Creation Queries for reference
CREATE TABLE IF NOT EXISTS `words` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` VARCHAR(255),
  `difficulty` INTEGER,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `players` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `playerName` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255),
  `salt` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
);
CREATE TABLE IF NOT EXISTS `guest_plays` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `playerName` VARCHAR(255),
  `playedLetters` VARCHAR(255),
  `startedAt` DATETIME,
  `endedAt` DATETIME,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `wordId` INTEGER REFERENCES `words` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `single_games` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `playedLetters` VARCHAR(255),
  `endedAt` DATETIME,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `wordId` INTEGER REFERENCES `words` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE,
    `gameSessionId` INTEGER REFERENCES `game_sessions` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS `game_sessions` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `currentLevel` INTEGER,
  `startedAt` DATETIME,
  `endedAt` DATETIME,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `playerId` INTEGER REFERENCES `players` (`id`) ON DELETE
  SET NULL ON UPDATE CASCADE
);