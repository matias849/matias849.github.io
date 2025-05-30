$(document).ready(function() {
    // Cargar el archivo JSON con jQuery
    $.getJSON('datos.json', function(data) {
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
    }, 800); // 3000 milisegundos = 3 segundos

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
        if ($(this).scrollTop() > 0 && !messageHidden) {
            $('#indicacion').fadeOut(200); // Ocultar el mensaje suavemente
            messageHidden = true; // Marcar el mensaje como oculto
        }
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

$(document).ready(function() {
    // Mostrar el mensaje inicialmente
    $('#message').fadeIn(500);

    // Temporizador para ocultar el mensaje después de 3 segundos
    setTimeout(function() {
        $('#message').animate({ opacity: 0 }, 2000, function() {
            $(this).css('display', 'none'); // Ocultar el elemento después de que la animación termine
        });
    }, 800); // 3000 milisegundos = 3 segundos

    $(window).scroll(function() {
        // Si el usuario se desplaza hacia abajo
        if ($(this).scrollTop() > 0) {
            $('#message').animate({ opacity: 0 }, 2000, function() {
                $(this).css('display', 'none'); // Ocultar el elemento después de que la animación termine
            });
        }
    });
});

$(document).ready(function() {
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

