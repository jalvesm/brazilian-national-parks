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
  renderDetails();
  