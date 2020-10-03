// Comando para establar comunicación
var socket = io();

// socket.on('connect', function() { console.log('Conectado al server'); });
// socket.on('disconnect', function() { console.log('DES-Conectado al server'); });

// capturar parametro URL
var searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
};

var escritorio = searchParam.get('escritorio');
var lbl = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            lbl.text(resp);
            alert(resp);
            return;
        }

        lbl.text(resp.numero);
    });


});

//$('small').text(ticket)