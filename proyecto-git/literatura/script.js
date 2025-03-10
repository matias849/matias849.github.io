document.addEventListener("DOMContentLoaded", () => {
  const genreLinks = document.querySelectorAll("ul li a"); // Seleccionar todos los enlaces de géneros
  const infoContainer = document.getElementById("info"); // Contenedor para los libros
  const sectionTitle = document.querySelector(".section h2"); // Título de la sección
  const modal = document.getElementById("modal"); // Modal para mostrar el PDF
  const pdfFrame = document.getElementById("pdf-frame"); // iframe para cargar el PDF
  const closeModal = document.querySelector(".close"); // Botón para cerrar el modal
  const carouselInner = document.querySelector('.carousel-inner'); // Contenedor del carrusel
  let currentIndex = 0; // Índice actual del carrusel

  // Función para mostrar el elemento actual del carrusel
  function showCurrent() {
      const itemWidth = document.querySelector('.carousel').offsetWidth;
      const offset = -currentIndex * itemWidth;
      carouselInner.style.transform = `translateX(${offset}px)`;
  }

  // Botón siguiente del carrusel
  document.querySelector('.next-btn').addEventListener("click", () => {
      const items = document.querySelectorAll('.carousel-item');
      currentIndex = (currentIndex + 1) % items.length;
      showCurrent();
  });

  // Botón anterior del carrusel
  document.querySelector('.prev-btn').addEventListener("click", () => {
      const items = document.querySelectorAll('.carousel-item');
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showCurrent();
  });

  // Carrusel automático (opcional)
  setInterval(() => {
      const items = document.querySelectorAll('.carousel-item');
      currentIndex = (currentIndex + 1) % items.length;
      showCurrent();
  }, 3000);

  // Agregar eventos a los enlaces de géneros
  genreLinks.forEach(link => {
      link.addEventListener("click", (event) => {
          event.preventDefault(); // Evitar el comportamiento por defecto del enlace
          const genre = link.id.replace("-link", ""); // Extraer el género del id del enlace

          fetch('datos.json') // Cargar el archivo JSON
              .then(response => response.json())
              .then(data => {
                  const books = data.libros[genre]; // Obtener los libros del género
                  infoContainer.innerHTML = ''; // Limpiar el contenedor de libros

                  // Capitalizar el nombre del género para el título
                  const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);
                  sectionTitle.textContent = `Libros de ${genreName}`; // Actualizar el título

                  // Generar el contenido de los libros
                  books.forEach(book => {
                      const bookHTML = `
                          <div class="book">
                              <img src="${book.portada}" alt="Portada de ${book.titulo}" 
                                   class="book-cover" data-pdf="${book.pdf}">
                              <h3>${book.titulo}
                                  <br><a href="${book.pdf}" class="book-a" target="_blank">Descargar</a>
                              </h3>
                              <p><strong>Autor:</strong> ${book.autor}</p>
                              <p><strong>Fecha de publicación:</strong> ${book.fecha_publicacion}</p>
                              <p><strong>Descripción:</strong> ${book.descripcion}</p>
                          </div>
                      `;
                      infoContainer.innerHTML += bookHTML; // Agregar el libro al contenedor
                  });

                  // Agregar eventos a las imágenes de los libros
                  document.querySelectorAll(".book-cover").forEach(img => {
                      img.addEventListener("click", () => {
                          const pdfUrl = img.getAttribute("data-pdf");
                          pdfFrame.src = pdfUrl; // Cargar el PDF en el iframe
                          modal.style.display = "block"; // Mostrar el modal
                      });
                  });
              })
              .catch(error => console.error('Error al cargar el JSON:', error)); // Manejo de errores
      });
  });

  // Cerrar el modal al hacer clic en el botón de cerrar
  closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      pdfFrame.src = ""; // Limpiar el iframe al cerrar el modal
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
          pdfFrame.src = ""; // Limpiar el iframe
      }
  });
});

  
  
  
  
// Mensaje de bienvenida al cargar la página
// window.addEventListener('load', () => {
//     alert('¡Bienvenido a la página de Literatura! Disfruta explorando autores y libros.');
//   });
  
//   // Efecto de desplazamiento suave al hacer clic en los enlaces del menú
//   document.querySelectorAll('header nav ul li a').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       e.preventDefault(); // Evita el comportamiento predeterminado
//       const targetSection = document.querySelector(this.getAttribute('href'));
//       targetSection.scrollIntoView({
//         behavior: 'smooth'
//       });
//     });
//   });
  
//   // Filtrar recomendaciones (función ejemplo para futuro uso)
//   function filtrarRecomendaciones(categoria) {
//     const libros = document.querySelectorAll('.libro');
//     libros.forEach(libro => {
//       // Aquí podrías usar una lógica para mostrar/ocultar según la categoría
//       libro.style.display = categoria === 'todos' || libro.innerText.includes(categoria) ? 'block' : 'none';
//     });
//   }
  
//   // Evento para una función futura (puedes vincular botones para filtrar)
//   document.querySelectorAll('.filtro-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const categoria = btn.dataset.categoria; // Supongamos que cada botón tiene un data-categoria
//       filtrarRecomendaciones(categoria);
//     });
//   });
  