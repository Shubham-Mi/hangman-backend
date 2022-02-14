async function playerSerializer(Player) {
  const id = Player.id;
  const name = Player.playerName;

  return {
    id: id,
    name: name,
  };
}

async function playerNotFound(name) {
  return {
    id: -1,
    name: name,
  };
}

module.exports = {
  playerSerializer,
  playerNotFound,
};
