export {};
function handleLeft({ socket, io, join }):void {
  socket.on('left', (user: String):void => {
    join = join.filter((item: { user: String }) => item.user !== user);
    io.emit('left', join)
    console.log(`${user} disconnected`)
    console.log(join)
  })
}

export default handleLeft;