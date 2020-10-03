// Comando para establar comunicación
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() { console.log('Conectado al server'); });

socket.on('disconnect', function() { console.log('DES-Conectado al server'); });

socket.on('estadoActual', function(res) {
    //console.log(res);
    label.text(res.actual);
});

$('button').on('click', function() {

    // Enviar a crear nuevo ticket al server
    /**
     * PARA Ser una petición en dos vias de manera inmediata, se debe poner 
     * tres parametros 
     */
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

});