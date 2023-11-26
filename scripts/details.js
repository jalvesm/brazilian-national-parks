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

async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const parkId = urlParams.get('id');

  const park = await fetchParkDetails(parkId);
  updateParkDetails(park);
}

function renderCard(park) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-md-3 col-sm-6 mb-3";

  cardDiv.innerHTML = `
    <div class="card">
      <img src="${park.image}" class="card-img-top object-fit-cover" alt="..." height="200px">
      <div class="card-body">
        <a class="btn btn-primary-outline" href="#" data-bs-toggle="modal" data-bs-target="#parkModal${park.id}">Ver Detalhes</a>
      </div>
    </div>
  `;

  const modalDiv = createModal(park);
  cardDiv.appendChild(modalDiv);

  cardDiv.querySelector('.btn').addEventListener('click', () => {
    const myModal = new bootstrap.Modal(document.getElementById(`parkModal${park.id}`));
    myModal.show();
  });

  return cardDiv;
}


function createModal(park) {
  const modalDiv = document.createElement("div");
  modalDiv.className = "modal";
  modalDiv.id = `parkModal${park.id}`;
  modalDiv.tabIndex = "-1";
  modalDiv.role = "dialog";

  modalDiv.innerHTML = `
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${park.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>${park.description}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  `;

  return modalDiv;
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
