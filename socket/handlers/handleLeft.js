function handleLeft({ socket, io, join }) {
  socket.on('left', (user) => {
    join = join.filter((item) => item.user !== user);
    io.emit('left', join)
    console.log(`${user} disconnected`)
    console.log(join)
  })
}

module.exports = handleLeft;