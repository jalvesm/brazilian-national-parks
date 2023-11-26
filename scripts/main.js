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


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmFhbHZlc20iLCJhIjoiY2xwZmh0bDcwMWJ3MTJqcXN2MGhlOWFkcSJ9.zLCmGObcm88gLI6twBZnmQ';
const map = new mapboxgl.Map({
container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});


// Chama a função para renderizar a página após o carregamento da página
window.addEventListener("load", renderPage);
