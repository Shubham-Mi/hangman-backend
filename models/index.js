const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

class Word extends Model {}
Word.init(
  {
    title: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
  },
  { sequelize, modelName: "words" }
);

class Player extends Model {}
Player.init(
  {
    playerName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
  },
  { sequelize, modelName: "players" }
);

class SingleGame extends Model {}
SingleGame.init(
  {
    playedLetters: DataTypes.STRING,
    endedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "single_games" }
);

class GameSession extends Model {}
GameSession.init(
  {
    currentLevel: DataTypes.INTEGER,
    startedAt: DataTypes.DATE,
    endedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "game_sessions" }
);

class GuestPlay extends Model {}
GuestPlay.init(
  {
    playerName: DataTypes.STRING,
    playedLetters: DataTypes.STRING,
    startedAt: DataTypes.DATE,
    endedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "guest_play" }
);

GuestPlay.Word = GuestPlay.belongsTo(Word);
SingleGame.Word = SingleGame.belongsTo(Word);
GameSession.Player = GameSession.belongsTo(Player);
GameSession.Game = GameSession.hasMany(SingleGame);

module.exports = {
  sequelize,
  Word,
  Player,
  SingleGame,
  GameSession,
  GuestPlay,
};
