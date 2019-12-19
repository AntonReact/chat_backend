export {};
function handleJoin({ socket, io, join }):void {
  socket.on('join', (user: String):void => {
    const users: Array<String> = join.map(({ user }) => user);
    users.indexOf(user) === -1 && join.push({ user });
    io.emit('join', join);
    console.log(`${user} connected`)
  });
}

export default handleJoin;