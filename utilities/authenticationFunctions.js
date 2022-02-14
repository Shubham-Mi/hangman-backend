const { generateSaltHash, verifySaltHash } = require("password-salt-and-hash");
const { Player } = require("../models");

async function calculateSalt(pass) {
  let hashPassword = generateSaltHash(pass);
  return hashPassword;
}

async function findNameUniqueness(name) {
  const player = await Player.findOne({
    where: {
      playerName: name,
    },
  });

  return player;
}

async function checkPassword(userName, password) {
  const player = await Player.findOne({
    where: {
      playerName: userName,
    },
  });

  if (player === null) {
    return -1;
  } else {
    let isPasswordMatch = verifySaltHash(
      player.salt,
      player.password,
      password
    );

    if (isPasswordMatch) {
      return player.id;
    } else {
      return -1;
    }
  }
}

module.exports = {
  calculateSalt,
  findNameUniqueness,
  checkPassword,
};
