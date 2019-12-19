export {};
import handleMsg from './handlers/handleMsg';
import handleUsers from './handlers/handleUsers';

function socketRoot(io: any): void {
  let state:Array<any> = [];
  let join:Array<any> = [];

  io.on('connection', (socket: any): void => {
    io.emit('message', state);

    const props: { socket: any, io: any, state: Array<Object>, join: Array<Object> } = { socket, io, state, join };

    handleMsg(props);
    handleUsers(props);
  });
}

module.exports = socketRoot;