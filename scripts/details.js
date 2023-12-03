const urlBase = "https://jsonserver1.joanamorais.repl.co";

async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const parkId = urlParams.get('id');

  const park = await fetchParkDetails(parkId);
  updateParkDetails(park);
}

// Função para buscar detalhes do produzto a partir do arquivo JSON
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

// ALBUM DETAILS: renderiza novas fotos, sem estrutura de cards
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
// ##########################################################################################
// Cards section with bugs
// ALBUM GENÉRICO: Renderiza os cards antigos 
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
  const cardContainer = document.getElementById("albumPhotos");

  const parks = await fetchPark();

  for (let i = 0; i < parks.length; i++) {
    const card = renderCard(parks[i]);
    cardContainer.appendChild(card);
  }

}

// ##########################################################################################
// CODE FOR TICKBOX IN 'DESTAQUE' SECTION

let idDestaque = null;

async function initiateCheckbox() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');

  try {
    const response = await fetch (`${urlBase}/highlights?albumId=${albumId}`);
    const data = await response.json();
    setHighlight(data);
  } catch (error) {
    console.error('Album não é destaque: ', error);
  }

  // Get checkbox element by its id
  const checkbox = document.getElementById('highlight');

  checkbox.addEventListener('change', function(event) {
    // checks if box is ticked
    if (event.target.checked) {
      addHighlight()
      console.log('Checkbox marcado!');
    } else {
      removeHighlight()
      console.log('Checkbox não está marcado!');
    }
  });
}

function setHighlight(highlights) {
  const checkbox = document.getElementById('highlight');

  if (highlights && highlights[0]) {
    checkbox.checked = true;
    idDestaque = highlights[0].id;
  }
}

function addHighlight() {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');
  idDestaque = albumId;

  const url = `${urlBase}/highlights`;
  const data = { albumId: parseInt(albumId)};
  const request = {
    method: "POST",
    headers: {"Contedt-Type": "application/json"},
    body: JSON.stringify(data),
  };
  fetch(url, request).then((response) => {
    console.log(response);
    alert('Album adicionado aos destaques!')
  });
  return true;
}

function removeHighlight() {
  const url = `${urlBase}/highlights/${idDestaque}`;
  const request = { method: "DELETE"};
  fetch(url, request).then((response) => {
    console.log(response);
    alert('Album removido dos destaques!');
  });
  return true;
}

// Chama a função para renderizar a página após o carregamento da página
renderDetails();

window.addEventListener("load", renderPage);
initiateCheckbox();