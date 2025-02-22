// // Initialize the map and set default view
// const map = L.map('map').setView([0, 0], 2);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     maxZoom: 19
// }).addTo(map);

// // Initialize marker for the satellite
// let satelliteMarker = L.marker([0, 0]).addTo(map);

// // Function to fetch satellite data from an API
// async function fetchSatelliteData() {
//     try {
//         const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544'); // ISS Satellite ID
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching satellite data:', error);
//         return null;
//     }
// }

// // Function to update satellite position on the map
// async function updateSatellitePosition() {
//     const satelliteData = await fetchSatelliteData();
//     if (!satelliteData) return; // Exit if data fetching failed

//     const { latitude, longitude, name, id } = satelliteData;

//     // Update marker position
//     satelliteMarker.setLatLng([latitude, longitude]);

//     // Update satellite information in the UI
//     document.getElementById('satellite-name').textContent = `Name: ${name}`;
//     document.getElementById('satellite-id').textContent = `ID: ${id}`;
//     document.getElementById('satellite-lat').textContent = `Latitude: ${latitude.toFixed(2)}`;
//     document.getElementById('satellite-lon').textContent = `Longitude: ${longitude.toFixed(2)}`;

//     // Center map on satellite
//     map.setView([latitude, longitude], 3);
// }

// // Update satellite position every 5 seconds
// setInterval(updateSatellitePosition, 5000);

// // Initial load
// async function fetchSatelliteData() {
//     console.log('Making request to backend...');
//     try {
//         const response = await fetch('http://localhost:3000/api/satellite/25544');
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log('Data received from backend:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching satellite data:', error);
//         return null;
//     }
// }
// Initialize the map and set default view
// const map = L.map('map').setView([0, 0], 2);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     maxZoom: 19
// }).addTo(map);

// // Initialize marker for the satellite
// let satelliteMarker = L.marker([0, 0]).addTo(map);

// // List of satellite IDs
// const satelliteIds = ['25544', '33591', '37820']; // Example IDs for ISS, TerraSAR-X, Hubble Space Telescope
// let currentIndex = 0;

// // Function to fetch satellite data from an API
// async function fetchSatelliteData(satelliteId) {
//     try {
//         const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${satelliteId}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching satellite data:', error);
//         return null;
//     }
// }

// // Function to update satellite position on the map
// async function updateSatellitePosition() {
//     const satelliteId = satelliteIds[currentIndex];
//     const satelliteData = await fetchSatelliteData(satelliteId);
//     if (!satelliteData) return; // Exit if data fetching failed

//     const { latitude, longitude, name, id } = satelliteData;

//     // Update marker position
//     satelliteMarker.setLatLng([latitude, longitude]);

//     // Update satellite information in the UI
//     document.getElementById('satellite-name').textContent = `Name: ${name}`;
//     document.getElementById('satellite-id').textContent = `ID: ${id}`;
//     document.getElementById('satellite-lat').textContent = `Latitude: ${latitude.toFixed(2)}`;
//     document.getElementById('satellite-lon').textContent = `Longitude: ${longitude.toFixed(2)}`;

//     // Center map on satellite
//     map.setView([latitude, longitude], 3);

//     // Move to the next satellite
//     currentIndex = (currentIndex + 1) % satelliteIds.length;
// }

// // Update satellite position every 5 seconds
// setInterval(updateSatellitePosition, 5000);

// // Initial load
// updateSatellitePosition();
// async function fetchSatelliteData() {
//     console.log('Making request to backend...');
//     try {
//         const response = await fetch('http://localhost:3000/api/satellite/25544');
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log('Data received from backend:', data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching satellite data:', error);
//         return null;
//     }
// }
// // Event listener for dropdown change
// document.getElementById('satellite-selector').addEventListener('change', async (event) => {
//     currentIndex = satelliteIds.indexOf(event.target.value);
//     await updateSatellitePosition(); // Update immediately
// });
// Initialize the map and set default view
// const map = L.map('map').setView([0, 0], 2);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     maxZoom: 19
// }).addTo(map);

// // Initialize marker for the satellite
// let satelliteMarker = L.marker([0, 0]).addTo(map);


// // Function to fetch satellite data from an API
// async function fetchSatelliteData(satelliteId) {
//     try {
//         const response = await fetch(`https://api.wheretheiss.at/v1/satellites/${satelliteId}`);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch data: ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching satellite data:', error);
//         return null;
//     }
// }

// // Function to update satellite position on the map
// async function updateSatellitePosition(satelliteId) {
//     const satelliteData = await fetchSatelliteData(satelliteId);
//     if (!satelliteData) return; // Exit if data fetching failed

//     const { latitude, longitude, name, id } = satelliteData;

//     // Update marker position
//     satelliteMarker.setLatLng([latitude, longitude]);

//     // Update satellite information in the UI
//     document.getElementById('satellite-name').textContent = `Name: ${name}`;
//     document.getElementById('satellite-id').textContent = `ID: ${id}`;
//     document.getElementById('satellite-lat').textContent = `Latitude: ${latitude.toFixed(2)}`;
//     document.getElementById('satellite-lon').textContent = `Longitude: ${longitude.toFixed(2)}`;

//     // Center map on satellite
//     map.setView([latitude, longitude], 3);
// }

// // Event listener for dropdown change
// document.getElementById('satellite-selector').addEventListener('change', async (event) => {
//     const selectedId = event.target.value;
//     await updateSatellitePosition(selectedId); // Update immediately based on selection
// });

// // Initial load with default satellite ID (e.g., ISS)
// updateSatellitePosition('25544'); // Start with ISS
// async function fetchSatelliteData() {
//         console.log('Making request to backend...');
//         try {
//             const response = await fetch('http://localhost:3000/api/satellite/25544');
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch data: ${response.statusText}`);
//             }
//             const data = await response.json();
//             console.log('Data received from backend:', data);
//             return data;
//         } catch (error) {
//             console.error('Error fetching satellite data:', error);
//             return null;
//         }
//     }
//     document.getElementById('satellite-selector').addEventListener('change', async (event) => {
//     currentIndex = satelliteIds.indexOf(event.target.value);
//     await updateSatellitePosition(); // Update immediately
// });