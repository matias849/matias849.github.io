$(document).ready(function() {
  $.getJSON('niñera.json', function(data) {
      const nannies = data.nannies;
      const section = $('#nannies-section');

      nannies.forEach(function(nanny) {
        const nannyDiv = $('<div></div>');

        // Imagen
        const img = $('<img>').attr('src', nanny.img);
        nannyDiv.append(img);

        // Nombre de la niñera
        const name = $('<h3></h3>').text(nanny.nombre);
        nannyDiv.append(name);

        // Lista de detalles
        const detailsList = $('<ul></ul>');
        const priceItem = $('<li></li>').html(`<strong>Precio:</strong> $${nanny.precio}`);
        const languageItem = $('<li></li>').html(`<strong>Idioma:</strong> ${nanny.idioma}`);
        const availabilityItem = $('<li></li>').html(`<strong>Disponibilidad:</strong> ${nanny.disponibilidad}`);
        detailsList.append(priceItem, languageItem, availabilityItem);
        nannyDiv.append(detailsList);

        // Botón de solicitud
        const button = $('<button></button>').text('Solicitar');
        button.on('click', function() {
            // Crear el cuadro modal
            const overlay = $('<div></div>').css({
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            });

            const modal = $('<div></div>').css({
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center'
            });

            const messageText = $('<p></p>').text(`Solicitud aceptada para ${nanny.nombre}`);
            const closeButton = $('<button></button>').text('Cerrar').css({
                marginTop: '10px',
                padding: '5px 10px'
            });

            // Al hacer clic en el botón "Cerrar", se eliminará el modal
            closeButton.on('click', function() {
                overlay.remove();
            });

            // Agregar contenido al modal
            modal.append(messageText, closeButton);
            overlay.append(modal);
            $('body').append(overlay);
        });

        nannyDiv.append(button);
        section.append(nannyDiv);
    });
});
});