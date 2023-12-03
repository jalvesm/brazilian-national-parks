const urlBase = "https://nationalparksjsonserver.joanamorais.repl.co";

async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const parkId = urlParams.get('id');

  const park = await fetchParkDetails(parkId);
  updateParkDetails(park);
}

// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchParkDetails(parkId) {
  try {
    const response = await fetch(`${urlBase}/parks/${parkId}?_embed=photos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

function updateParkDetails(park) {
  
  if (park) {
    document.getElementById('parkName').textContent = park.name;
    document.getElementById('parkImage').src = park.image;
    document.getElementById('parkDescription').textContent = park.description;
    document.getElementById('parkLong').textContent = `Longitude: ${park.location_coordinates[0].toFixed(2)}`;
    document.getElementById('parkLat').textContent = `Latitude: ${park.location_coordinates[1].toFixed(2)}`;
    document.getElementById('parkData').textContent = park.data;
    document.getElementById('parkAuthor').textContent = park.author;

    if (park.photos && park.photos.length > 0) {
      renderPhotos(park.photos);
    }
  } else {
    alert('park não encontrado');
  }
}

async function renderPhotos(photos) {
  
  const divPhotos = document.getElementById('albumPhotos'); // revisar o ID dessa div
  photos.forEach(photo => {
    const htmlPhoto = `
    <a data-bs-toggle="modal" data-bs-target="#modal-fotos">
    <img src="${photo.image}" alt="${photo.description}" width="200">
    <p>${photo.description}</p>
    `;
    divPhotos.innerHTML += htmlPhoto;   
  });
}


function renderCard(park) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-md-3 col-sm-6 mb-3";

  cardDiv.innerHTML = `
    <div class="card">
      <img src="${park.image}" class="card-img-top object-fit-cover" alt="park picture" height="200px">
      <div class="card-body">
        <a class="btn btn-primary-outline" href="./details.html?id=${park.id}" data-bs-toggle="modal" data-bs-target="#parkModal${park.id}">Ver Detalhes</a>
      </div>
    </div>
  `;
  return cardDiv;
}


// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchPark() {
  try {
    const response = await fetch(`${urlBase}/photos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

// Função para renderizar a página
async function renderPage() {
  const numCards = 12;
  const cardContainer = document.getElementById("albumPhotos");

  const parks = await fetchPark();

  for (let i = 0; i < parks.length; i++) {
    const card = renderCard(parks[i]);
    cardContainer.appendChild(card);
  }

}

// Chama a função para renderizar a página após o carregamento da página
renderDetails();

window.addEventListener("load", renderPage);
