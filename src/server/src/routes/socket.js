module.exports = function(io, db) {

    io.on('connection', function (socket) {
        socket.on('FETCH_ATTENDANCE', async (data) => {
            socket.emit('FETCH_ATTENDANCE', (await db.get('events')))
        });

        socket.on('FETCH_USERS', async (data) => {
            socket.emit('FETCH_USERS', (await db.get('users')))
        });

        socket.on('ADD_ATTENDANCE', async (data) => {
        	await db.post('attendance', data)
            socket.emit('ADD_ATTENDANCE', data)
        });
    });
};