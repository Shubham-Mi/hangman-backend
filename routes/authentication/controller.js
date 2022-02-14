const {
  calculateSalt,
  findNameUniqueness,
  checkPassword,
} = require("../../utilities/authenticationFunctions");
const { Player } = require("../../models");
const {
  playerSerializer,
  playerNotFound,
} = require("../../serializers/player");

async function createPlayer(req, res) {
  const userName = req.body.name;
  const playerFound = await findNameUniqueness(userName);

  if (playerFound) {
    res.json(await playerNotFound(userName));
  } else {
    const userPassword = req.body.password;
    const hashResult = await calculateSalt(userPassword);
    const finalPassword = hashResult.password;
    const finalSalt = hashResult.salt;

    const newPlayer = await Player.create({
      playerName: userName,
      password: finalPassword,
      salt: finalSalt,
    });

    res.json(await playerSerializer(newPlayer));
  }
}

async function authenticate(req, res) {
  const userName = req.body.name;
  const password = req.body.password;

  const playerFound = await checkPassword(userName, password);

  if (playerFound === -1) {
    res.json(await playerNotFound(userName));
  } else {
    const player = await Player.findByPk(playerFound);
    res.json(await playerSerializer(player));
  }
}

module.exports = {
  createPlayer,
  authenticate,
};
