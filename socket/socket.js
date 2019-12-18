const handleMsg = require('./handlers/handleMsg');
const handleUsers = require('./handlers/handleUsers');

function socketRoot(io) {
  let state = [];
  let join = [];

  io.on('connection', (socket) => {
    io.emit('message', state);

    const props = { socket, io, state, join };

    handleMsg(props);
    handleUsers(props);
  });
}

module.exports = socketRoot;