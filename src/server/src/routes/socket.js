module.exports = function(io, db) {

    io.on('connection', function (socket) {
        socket.on('FETCH_EVENTS', (data) => {
            socket.emit('FETCH_EVENTS', 'lul')
        });
    });
};