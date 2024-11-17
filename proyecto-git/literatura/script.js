document.addEventListener("DOMContentLoaded", () => {
    const genreLinks = document.querySelectorAll("ul li a"); // Seleccionar todos los géneros
    const infoContainer = document.getElementById("info");
    const sectionTitle = document.querySelector(".section h2"); // Seleccionar título
    const modal = document.getElementById("modal");
    const pdfFrame = document.getElementById("pdf-frame");
    const closeModal = document.querySelector(".close");
  
    genreLinks.forEach(link => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const genre = link.id.replace("-link", "");
  
        fetch('datos.json')
          .then(response => response.json())
          .then(data => {
            const books = data.libros[genre];
            infoContainer.innerHTML = '';
            const genreName = genre.charAt(0).toUpperCase() + genre.slice(1);
            sectionTitle.textContent = `Libros de ${genreName}`;
  
            books.forEach(book => {
              const bookHTML = `
                <div class="book">
                  <img src="${book.portada}" alt="Portada de ${book.titulo}" class="book-cover" data-pdf="${book.pdf}">
                  <h3>${book.titulo}<br><a href="${book.pdf}" class="book-a" target="_blank">descargar</a></h3>
                  <p><strong>Autor:</strong> ${book.autor}</p>
                  <p><strong>Fecha de publicación:</strong> ${book.fecha_publicacion}</p>
                  <p><strong>Descripción:</strong> ${book.descripcion}</p>
                </div>
              `;
              infoContainer.innerHTML += bookHTML;
            });
  
            // Agregar eventos para las imágenes
            document.querySelectorAll(".book-cover").forEach(img => {
              img.addEventListener("click", () => {
                const pdfUrl = img.getAttribute("data-pdf");
                pdfFrame.src = pdfUrl; // Cargar el PDF en el iframe
                modal.style.display = "block"; // Mostrar el modal
              });
            });
          })
          .catch(error => console.error('Error al cargar el JSON:', error));
      });
    });
  
    // Cerrar el modal
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      pdfFrame.src = ""; // Limpiar el iframe al cerrar el modal
    });
  
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        pdfFrame.src = "";
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
  