define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function formatTime(item) {
        return item >= 10 ? `${item}` : `0${item}`;
    }
    function handleMsg({ socket, io, state }) {
        socket.on('getInitMsg', () => {
            io.emit('message', state);
        });
        socket.on('message', (e) => {
            const isCommand = e.message[0] === '/';
            if (!isCommand) {
                const date = new Date();
                const hours = formatTime(date.getHours());
                const minutes = formatTime(date.getMinutes());
                const time = `${hours}:${minutes}`;
                const row = `${e.user}: ${e.message}`;
                console.log(`${row}\n-- ${date}`);
                state.push({ ...e, time, id: state.length + 1 });
            }
            if (e.user.toLowerCase() === 'admin' && isCommand) {
                switch (e.message) {
                    case '/clear':
                        {
                            state = [];
                            io.emit('message', []);
                            io.emit('log', { command: 'Admin cleared the chat' });
                            console.log('chat cleared');
                        }
                        break;
                    default: console.log('command not found');
                }
            }
            io.emit('message', state);
        });
    }
    ;
    exports.default = handleMsg;
});
