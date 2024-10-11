document.addEventListener('DOMContentLoaded', function() {
    // Carrusel
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const itemCount = items.length;

    // Función para mostrar la imagen actual
    function showCurrent() {
        const itemWidth = document.querySelector('.carousel').offsetWidth;
        const offset = -currentIndex * itemWidth;
        document.querySelector('.carousel-inner').style.transform = `translateX(${offset}px)`;
    }

    // Botón siguiente
    document.querySelector('.next-btn').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % itemCount;
        showCurrent();
    });

    // Botón anterior
    document.querySelector('.prev-btn').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        showCurrent();
    });

    // Carrusel automático (opcional)
    setInterval(function() {
        currentIndex = (currentIndex + 1) % itemCount;
        showCurrent();
    }, 3000);
});
