define(["require", "exports", "./handlers/handleMsg", "./handlers/handleUsers"], function (require, exports, handleMsg_1, handleUsers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function socketRoot(io) {
        let state = [];
        let join = [];
        io.on('connection', (socket) => {
            io.emit('message', state);
            const props = { socket, io, state, join };
            handleMsg_1.default(props);
            handleUsers_1.default(props);
        });
    }
    module.exports = socketRoot;
});
