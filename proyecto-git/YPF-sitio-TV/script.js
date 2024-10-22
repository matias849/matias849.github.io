$(document).ready(function() {
    // Cargar el archivo JSON con jQuery, agregando un parámetro timestamp para evitar la caché
    $.getJSON('https://matias849.github.io/proyecto-git/YPF-sitio/datos.json?timestamp=' + new Date().getTime(), function(data) {
        const informacion = data.informacion; // Accedemos al array "informacion"
        const contenidoDiv = $('#contenido');

        // Iterar sobre los elementos de "informacion" y agregarlos al DOM
        $.each(informacion, function(index, item) {
            contenidoDiv.append(`
                <section class="hidden">
                    <h2>${item.subtitulo}</h2>
                    <p>${item.texto}</p>
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
    }).fail(function() {
        console.error('Error al cargar el JSON.');
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

$(document).ready(function() {
    // Forzar el inicio desde la parte superior al cargar la página
    $(window).scrollTop(0);

    // Variables de control
    let isScrollingDown = true; // Comienza hacia abajo
    let scrollSpeedDown = 1;    // Velocidad de scroll hacia abajo (ajustado para hacerlo más lento)
    let scrollSpeedUp = 10;     // Velocidad de scroll hacia arriba
    let delayAtTarget = 6000;   // 6 segundos de pausa en el target
    let delayAtTop = 500;      // 1 segundos de pausa en la parte superior
    let scrollInterval;         // Guardar el intervalo de scroll

    // Función para iniciar el scroll hacia abajo
    function startScrollingDown() {
        scrollInterval = setInterval(function() {
            let scrollTop = $(window).scrollTop(); // Posición actual del scroll
            let targetPosition = $('#target').offset().top; // Posición del ID objetivo

            // Si estamos bajando
            if (isScrollingDown) {
                $(window).scrollTop(scrollTop + scrollSpeedDown);

                // Si hemos llegado al target, detener el scroll por unos segundos
                if (scrollTop >= targetPosition - $(window).height()) {
                    clearInterval(scrollInterval); // Detener el scroll
                    isScrollingDown = false;      // Cambiar la dirección
                    setTimeout(startScrollingUp, delayAtTarget); // Esperar en el target
                }
            }
        }, 20); // Intervalo de actualización para el scroll hacia abajo
    }

    // Función para iniciar el scroll hacia arriba
    function startScrollingUp() {
        scrollInterval = setInterval(function() {
            let scrollTop = $(window).scrollTop(); // Posición actual del scroll

            // Si estamos subiendo
            $(window).scrollTop(scrollTop - scrollSpeedUp);

            // Si hemos llegado a la parte superior, cambiar la dirección
            if (scrollTop <= 0) {
                clearInterval(scrollInterval); // Detener el scroll hacia arriba
                isScrollingDown = true;       // Cambiar la dirección
                
                // Esperar 2 segundos en la parte superior antes de volver a bajar
                setTimeout(startScrollingDown, delayAtTop);
            }
        }, 20); // Intervalo de actualización para el scroll hacia arriba
    }

    // Iniciar el ciclo de scroll
    startScrollingDown();
});
