export {};
function handleUsers({ socket, io, join }):void {

  socket.on('left', (user: String):void => {
    join = join.filter((item) => item.user !== user);
    io.emit('left', join)
    console.log(`${user} disconnected`)
  });

  socket.on('join', (user: String):void => {
    const users: Array<String> = join.map(({ user }) => user);
    users.indexOf(user) === -1 && join.push({ user });
    io.emit('join', join);
    console.log(`${user} connected`)
  });
}

export default handleUsers;