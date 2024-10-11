$(document).ready(function() {
    // Cargar el archivo JSON con jQuery, agregando un parámetro timestamp para evitar la caché
    $.getJSON('https://q6krhrkxdeajajzxqzwg1a.on.drv.tw/5%C2%B0A/ypf/datos.json?timestamp=' + new Date().getTime(), function(data) {
        const informacion = data.informacion; // Accedemos al array "informacion"
        const contenidoDiv = $('#contenido');

        // Iterar sobre los elementos de "informacion" y agregarlos al DOM
        $.each(informacion, function(index, item) {
            contenidoDiv.append(`
                <section class="hidden">
                    <h2>${item.subtitulo}</h2>
                    <p>${item.texto}</p>
                    <button class="actualizar" data-index="${index}">Actualizar</button>
                </section>
            `);
        });

        // Seleccionar las secciones ocultas después de que se hayan agregado al DOM
        const $sections = $('section.hidden');

        // Ejecutar la animación de scroll
        $(window).on('scroll', revealSections);

        // Llamar a la función para revelar secciones si ya están visibles al cargar la página
        revealSections();

        // Función para mostrar las secciones
        function revealSections() {
            $sections.each(function() {
                const sectionTop = $(this).offset().top;
                const triggerPoint = $(window).height() / 1.3;

                if ($(window).scrollTop() + triggerPoint > sectionTop) {
                    $(this).addClass('show');
                }
            });
        }

        // Evento click para actualizar la información usando PUT
        contenidoDiv.on('click', '.actualizar', function() {
            const index = $(this).data('index');
            const nuevoSubtitulo = prompt("Ingrese el nuevo subtítulo:", informacion[index].subtitulo);
            const nuevoTexto = prompt("Ingrese el nuevo texto:", informacion[index].texto);

            if (nuevoSubtitulo && nuevoTexto) {
                // Construir el objeto con los datos actualizados
                const nuevosDatos = {
                    subtitulo: nuevoSubtitulo,
                    texto: nuevoTexto
                };

                // Llamar a la función para enviar la petición PUT
                actualizarDatos(index, nuevosDatos);
            }
        });

        // Función para hacer la petición PUT
        function actualizarDatos(index, datos) {
            $.ajax({
                url: 'https://q6krhrkxdeajajzxqzwg1a.on.drv.tw/5%C2%B0A/ypf/datos.json',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(datos),
                success: function(response) {
                    console.log('Datos actualizados:', response);
                    alert('Los datos se han actualizado correctamente.');
                },
                error: function() {
                    console.error('Error al actualizar los datos.');
                    alert('Hubo un problema al actualizar los datos.');
                }
            });
        }
    }).fail(function() {
        console.error('Error al cargar el JSON.');
    });
});


    // Carrusel
    let currentIndex = 0;
    const items = $('.carousel-item');
    const itemCount = items.length;

    // Función para mostrar la imagen actual
    function showCurrent() {
        const itemWidth = $('.carousel').width();
        const offset = -currentIndex * itemWidth;
        $('.carousel-inner').css('transform', `translateX(${offset}px)`);
    }

    // Botón siguiente
    $('.next-btn').on('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        showCurrent();
    });

    // Botón anterior
    $('.prev-btn').on('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        showCurrent();
    });

    // Carrusel automático (opcional)
    setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        showCurrent();
    }, 3000);

    // Mostrar el mensaje inicialmente
    $('#message').fadeIn(500);

    // Temporizador para ocultar el mensaje después de 3 segundos
    setTimeout(function() {
        $('#message').animate({ opacity: 0 }, 2000, function() {
            $(this).css('display', 'none'); // Ocultar el elemento después de que la animación termine
        });
    }, 3000); // 3000 milisegundos = 3 segundos

    // Ocultar mensaje al hacer scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('#message').animate({ opacity: 0 }, 2000, function() {
                $(this).css('display', 'none'); // Ocultar el elemento después de que la animación termine
            });
        }
    });

    // Guardar el estado de si el mensaje se ha ocultado o no
    let messageHidden = false;
    $(window).scroll(function() {
        // Si el usuario ha desplazado hacia abajo y el mensaje no se ha ocultado aún
        if ($(this).scrollTop() > 0 && !messageHidden) {
            $('#indicacion').fadeOut(200); // Ocultar el mensaje suavemente
            messageHidden = true; // Marcar el mensaje como oculto
        }
    });
});
