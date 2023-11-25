// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchParkDetails(parkId) {
  try {
    const response = await fetch(`https://jsonserver.joanamorais.repl.co/parks/${parkId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

// Função para atualizar o conteúdo HTML com os detalhes do produto
function updateParkDetails(park) {
  if (park) {
    document.getElementById('parkName').textContent = park.title;
    document.getElementById('parkImage').src = park.image;
    document.getElementById('parkDescription').textContent = park.description;

    updateAdditionalImages(product.images);
  } else {
    alert('park não encontrado');
  }
}

// Função para inicializar a página e buscar detalhes do produto
async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const parkId = urlParams.get('id');

  const park = await fetchParkDetails(parkId);
  updateParkDetails(park);
}

// Chame a função initializePage quando a página carregar


/////////////////////////////////////////////////////

function renderCard(park) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-md-3 col-sm-6 mb-3";

  cardDiv.innerHTML = `
    <div class="card">
      <img src="${park.image}" class="card-img-top object-fit-cover" alt="..." height="200px">
      <div class="card-body">

        <a class="btn btn-primary-outline" href="./details.html?id=${park.id}">Ver Detalhes</a>
      </div>
    </div>
  `;

  return cardDiv;
}

// Função para buscar detalhes do produto a partir do arquivo JSON
async function fetchPark() {
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

  const parks = await fetchPark();

  for (let i = 0; i < parks.length; i++) {
    const card = renderCard(parks[i]);
    cardContainer.appendChild(card);
  }

}

// Chama a função para renderizar a página após o carregamento da página
renderDetails();

window.addEventListener("load", renderPage);
