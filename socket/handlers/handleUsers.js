function handleUsers({ socket, io, join }) {

  socket.on('left', (user) => {
    join = join.filter((item) => item.user !== user);
    io.emit('left', join)
    console.log(`${user} disconnected`)
  });
  socket.on('join', (user) => {
    const users = join.map(({ user }) => user);
    users.indexOf(user) === -1 && join.push({ user });
    io.emit('join', join);
    console.log(`${user} connected`)
  });
}

module.exports = handleUsers;