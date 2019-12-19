define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function handleJoin({ socket, io, join }) {
        socket.on('join', (user) => {
            const users = join.map(({ user }) => user);
            users.indexOf(user) === -1 && join.push({ user });
            io.emit('join', join);
            console.log(`${user} connected`);
        });
    }
    exports.default = handleJoin;
});
