function loadCarousel(){

    const urlParams = new URLSearchParams(window.location.search);
    const parkId = urlParams.get('id');

    fetch(`https://jsonserver3.joanamorais.repl.co/photos?parkId=${parkId}`)
        .then(response => response.json())
        .then(data => {
            const carouselIndicators = document.getElementById('carouselIndicators');
            const carouselInner = document.getElementById('carouselInner');

            // Para cada item, criar um indicador e um banner no carousel
            data.forEach((item, index) => {
                // Creates indicator
                const indicator = document.createElement('button');
                indicator.setAttribute('type', 'button');
                indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
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
                <img src="${item.image}" class="d-block w-100" alt="${item.description}">
                <div class="carousel-caption d-none d-md-block">
                <h5>${item.description}</h5>
                </div>
                </a>
                `;
                carouselItem.innerHTML = banner;
                carouselInner.appendChild(carouselItem);
            });
        })
}

loadCarousel();