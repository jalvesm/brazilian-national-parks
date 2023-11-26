// Função para renderizar um card
function renderCard(park) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-md-3 col-sm-6 mb-3";

  cardDiv.innerHTML = `
    <div class="card">
      <img src="${park.image}" class="card-img-top object-fit-cover" alt="..." height="200px">
      <div class="card-body">
        <h5 class="card-title">${park.title}</h5>
        <p class="card-text">${park.description}</p>
        <a class="btn btn-primary-outline" href="./details.html?id=${park.id}">Ver Detalhes</a>
      </div>
    </div>
  `;

  return cardDiv;
}


// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchParkDetails() {
  try {
    const response = await fetch('https://JSONServer.JoanaMorais.repl.co/parks');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

// Função para renderizar a página
async function renderPage() {
  const numCards = 12;
  const cardContainer = document.getElementById("card-container");

  const parks = await fetchParkDetails();

  for (let i = 0; i < parks.length; i++) {
    const card = renderCard(parks[i]);
    cardContainer.appendChild(card);
  }

}


function getMap() {
const centralPoint = [-43.618309977588, -19.348631627533067]
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmFhbHZlc20iLCJhIjoiY2xwZmh0bDcwMWJ3MTJqcXN2MGhlOWFkcSJ9.zLCmGObcm88gLI6twBZnmQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: centralPoint, // starting position [lng, lat]
    zoom: 11
  });
  return map;
}

function get_card_marker(park){
  return `
  <a class="text-decoration-none textreset" href="./details.html?id=${parks.id}"
  <img src="${parks.image}" class="card-img-top" alt="${parks.name}">
  <div class="card-body"
  <h5 class="card-title text truncate">${park.name}</h5>
  <p class="card-text">${park.location_name}</p>
  <div>
  `
}


function getLocations() {
  const url = "https://jsonserver.joanamorais.repl.co/parks";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((parks) => {
      parks.forEach((park) => {
        const marker = new mapboxgl.Marker({ color: "black" }) 
          .setLngLat(park.location_coordinates) 
          .addTo(map);
      });
    });
}



getMap();
window.addEventListener("load", renderPage);
