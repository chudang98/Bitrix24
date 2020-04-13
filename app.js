'use strict'
const Hapi = require('@hapi/hapi');
const Inert = require('inert');
const Path = require('path');

const port = 3000,
    host = 'localhost';

const routes = require('./routers/bitrix24API');

const init = async () => {
    const server = Hapi.server({
        port,
        host,
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.file('index.html');
        }
    });
    
    server.route(routes);
    
    await server.start();
    console.log('Server is running...');
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
