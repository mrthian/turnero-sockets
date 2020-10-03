const { io } = require('../server');

// ========================================================================
// Importación de unidades requeridas personalizadas
const { TicketControl } = require('../classes/ticket-control');
// ========================================================================

const ticketControl = new TicketControl();

// Functión para saber si el socket se conecto
io.on('connection', (client) => {

    // Siguiente ticket
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        //console.log(siguiente);
        callback(siguiente);
    });

    // emitir un evento del estado actual 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimo4()
    });

    // ATENDER TICKET
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({ err: true, mensaje: 'El escritorio es obligatorio' });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // Update pantalla principal | Todas las pantallas principales
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimo4()
        });
    });

});