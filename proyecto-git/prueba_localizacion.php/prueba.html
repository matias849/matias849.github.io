<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa con Búsqueda y Ubicación</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <style>
        #map { height: 500px; width: 100%; }
        #btnUbicacion {
            display: block;
            margin: 10px auto;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            background: #004080;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #btnUbicacion:hover {
            background: #002b55;
        }
    </style>
</head>
<body>

    <h2>Mapa con Búsqueda y Ubicación del Usuario</h2>
    <button id="btnUbicacion">📍 Obtener mi ubicación</button>
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>

    <script>
        // Inicializar el mapa con una ubicación por defecto (Buenos Aires)
        var map = L.map('map').setView([-34.6037, -58.3816], 13);

        // Agregar capa base (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Variable para guardar el marcador de la ubicación del usuario
        var userMarker;

        // Función para obtener la ubicación del usuario
        function obtenerUbicacion() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        var userLat = position.coords.latitude;
                        var userLon = position.coords.longitude;

                        // Si ya existe un marcador, eliminarlo
                        if (userMarker) {
                            map.removeLayer(userMarker);
                        }

                        // Agregar nuevo marcador en la ubicación del usuario
                        userMarker = L.marker([userLat, userLon]).addTo(map)
                            .bindPopup(`<b>📍 Tu ubicación</b><br>Lat: ${userLat.toFixed(6)}, Lon: ${userLon.toFixed(6)}`)
                            .openPopup();

                        // Centrar el mapa en la nueva ubicación
                        map.setView([userLat, userLon], 15);
                    },
                    function(error) {
                        alert("❌ No se pudo obtener la ubicación: " + error.message);
                    }
                );
            } else {
                alert("⚠️ Tu navegador no soporta geolocalización.");
            }
        }

        // Evento para el botón de obtener ubicación
        document.getElementById('btnUbicacion').addEventListener('click', obtenerUbicacion);

        // 🟢 BUSCADOR DE DIRECCIONES (Geocodificación con Nominatim)
        L.Control.geocoder({
            defaultMarkGeocode: false
        }).on('markgeocode', function(e) {
            var latlng = e.geocode.center;
            var placeName = e.geocode.name;
            var lat = latlng.lat.toFixed(6);
            var lon = latlng.lng.toFixed(6);

            // Mostrar alerta con la información
            alert(`📍 Ubicación encontrada:\n🔹 Nombre: ${placeName}\n🔹 Latitud: ${lat}\n🔹 Longitud: ${lon}`);

            // Agregar marcador en la ubicación encontrada
            L.marker(latlng).addTo(map)
                .bindPopup(`<b>${placeName}</b><br>Lat: ${lat}, Lon: ${lon}`)
                .openPopup();

            // Centrar el mapa en la ubicación encontrada
            map.setView(latlng, 15);
        }).addTo(map);
    </script>

</body>
</html>
