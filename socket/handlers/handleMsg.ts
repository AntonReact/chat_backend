export {};
function formatTime(item: Number):String {
  return item >= 10 ? `${item}` : `0${item}`;
}

function handleMsg({ socket, io, state }):void {

  socket.on('getInitMsg', ():void => {
    io.emit('message', state)
  })

  socket.on('message', (e: any):void => {
    const isCommand: Boolean = e.message[0] === '/';

    if (!isCommand) {
      const date: Date = new Date();
      const hours: String = formatTime(date.getHours());
      const minutes: String = formatTime(date.getMinutes());
      const time: String = `${hours}:${minutes}`;
      const row: String = `${e.user}: ${e.message}`;

      console.log(`${row}\n-- ${date}`);
      state.push({ ...e, time, id: state.length + 1 });
    }

    if (e.user.toLowerCase() === 'admin' && isCommand) {
      switch(e.message) {
        case '/clear': {
          state = [];
          io.emit('message', [])
          io.emit('log', { command: 'Admin cleared the chat' });
          console.log('chat cleared')
        }
          break;
        default: console.log('command not found');
      }
    }

    io.emit('message', state);
  })
};

export default handleMsg;