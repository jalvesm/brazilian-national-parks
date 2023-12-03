function loadCarousel(){
    fetch('https://nationalparksjsonserver.joanamorais.repl.co/hightlights/?_expand=park')
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.getElementById('carouselIndicators');
            const carouselInner = document.getElementById('carouselInner');

            // Para cada item, criar um indicador e um banner no carousel
            data.forEach((item, index) => {
                // Creates indicator
                const indicator = document.createElement('button');
                indicator.setAttribute('type', 'button');
                indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
                indicator.setAttribute('data-bs-slide-to', index.toString());

                if (index === 0){
                    indicator.classList.add('active');
                }
                carouselIndicators.appendChild(indicator);

                // Creates banner
                const carouselItem = document.createElement('div')
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }
                const banner = `
                <a href="./details.html?id=${item.park.id}">
                <img src="${item.park.image}" class="d-block w-100" alt="${item.park.name}">
                <div class="carousel-caption d-none d-md-block">
                <h5>${item.park.name}</h5>
                </div>
                </a>
                `;
                carouselItem.innerHTML = banner;
                carouselInner.appendChild(carouselItem);
            });
        })
}

loadCarousel();