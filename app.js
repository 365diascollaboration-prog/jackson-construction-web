/* ==========================================================================
   Jackson Construction - Interactive Web Logic (Filter & Micro-Animation Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------------------------------------------------
    // 0. Force Video Autoplay Fallback for Modern Browsers
    // ----------------------------------------------------------------------
    const desktopVideo = document.getElementById('heroVideoDesktop');
    const mobileVideo = document.getElementById('heroVideoMobile');

    function playVideosSafely() {
        if (desktopVideo) {
            desktopVideo.muted = true;
            desktopVideo.play().catch(err => console.log("Desktop video autoplay fallback:", err));
        }
        if (mobileVideo) {
            mobileVideo.muted = true;
            mobileVideo.play().catch(err => console.log("Mobile video autoplay fallback:", err));
        }
    }
    
    playVideosSafely();
    document.body.addEventListener('click', playVideosSafely, { once: true });
    document.body.addEventListener('touchstart', playVideosSafely, { once: true });

    // ----------------------------------------------------------------------
    // 1. Services Category Filter Tabs Logic
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 2. Calculator Logic
    // ----------------------------------------------------------------------
    const calcInputs = document.querySelectorAll('input[name="calc_service"], input[name="calc_size"]');
    const priceRangeElement = document.getElementById('priceRange');
    const resultDetailsElement = document.getElementById('resultDetails');
    const sendCalcWhatsappBtn = document.getElementById('sendCalcWhatsapp');

    const pricingMatrix = {
        'Remodelacion de Bano': {
            'Pequeno (1 Habitacion o Bano)': { range: '$1,200 USD - $2,800 USD', details: 'Incluye remoción de losas viejas, impermeabilización y losas nuevas.' },
            'Mediano (Area de 2 a 3 espacios)': { range: '$2,800 USD - $5,500 USD', details: 'Incluye azulejos de baño principal, ducha amplia y accesorios.' },
            'Grande (Propiedad o Casa Completa)': { range: '$5,500 USD - $9,500 USD', details: 'Remodelación de múltiples baños con acabados de alta gama.' }
        },
        'Instalacion de Pisos': {
            'Pequeno (1 Habitacion o Bano)': { range: '$600 USD - $1,500 USD', details: 'Instalación de losas o Vinyl Plank con nivelación.' },
            'Mediano (Area de 2 a 3 espacios)': { range: '$1,800 USD - $3,800 USD', details: 'Pisos para sala, comedor y cocina.' },
            'Grande (Propiedad o Casa Completa)': { range: '$4,200 USD - $8,500 USD', details: 'Instalación completa en toda la propiedad.' }
        },
        'Demolicion y Escombros': {
            'Pequeno (1 Habitacion o Bano)': { range: '$400 USD - $900 USD', details: 'Demolición menor y desalojo en camión.' },
            'Mediano (Area de 2 a 3 espacios)': { range: '$900 USD - $1,800 USD', details: 'Demolición de paredes, estructuras y bote de escombros.' },
            'Grande (Propiedad o Casa Completa)': { range: '$2,000 USD - $4,500 USD', details: 'Limpieza total de terreno y demolición estructural.' }
        },
        'Pintura General': {
            'Pequeno (1 Habitacion o Bano)': { range: '$450 USD - $950 USD', details: 'Preparación de paredes y pintura lavable.' },
            'Mediano (Area de 2 a 3 espacios)': { range: '$1,200 USD - $2,600 USD', details: 'Pintura interior completa con sellado.' },
            'Grande (Propiedad o Casa Completa)': { range: '$2,800 USD - $6,000 USD', details: 'Pintura exterior e interior resistente al clima tropical.' }
        },
        'Construccion General': {
            'Pequeno (1 Habitacion o Bano)': { range: '$1,500 USD - $3,500 USD', details: 'Construcción de pared o ampliación pequeña.' },
            'Mediano (Area de 2 a 3 espacios)': { range: '$3,500 USD - $8,000 USD', details: 'Estructura o ampliación de espacios.' },
            'Grande (Propiedad o Casa Completa)': { range: '$8,000 USD - $20,000+ USD', details: 'Proyecto de construcción o remodelación mayor.' }
        }
    };

    function updateCalculator() {
        const selectedService = document.querySelector('input[name="calc_service"]:checked').value;
        const selectedSize = document.querySelector('input[name="calc_size"]:checked').value;

        if (pricingMatrix[selectedService] && pricingMatrix[selectedService][selectedSize]) {
            const data = pricingMatrix[selectedService][selectedSize];
            priceRangeElement.textContent = data.range;
            resultDetailsElement.textContent = data.details;
        }
    }

    calcInputs.forEach(input => {
        input.addEventListener('change', updateCalculator);
    });

    sendCalcWhatsappBtn.addEventListener('click', function () {
        const selectedService = document.querySelector('input[name="calc_service"]:checked').value;
        const selectedSize = document.querySelector('input[name="calc_size"]:checked').value;
        const price = priceRangeElement.textContent;

        const message = `Hola Jackson Construction, calculé mi estimado en su página web:
- Servicio: ${selectedService}
- Tamaño: ${selectedSize}
- Estimado: ${price}

Quisiera agendar una visita gratis a mi propiedad para confirmar este trabajo.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/17875130607?text=${encodedMessage}`, '_blank');
    });

    updateCalculator();

    // ----------------------------------------------------------------------
    // 3. Parallax Video Effect on Scroll
    // ----------------------------------------------------------------------
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 1200) {
            const translateY = scrollPosition * 0.35;
            if (desktopVideo) desktopVideo.style.transform = `translateY(${translateY}px)`;
            if (mobileVideo) mobileVideo.style.transform = `translateY(${translateY}px)`;
        }
    });

    // ----------------------------------------------------------------------
    // 4. Before / After Interactive Slider
    // ----------------------------------------------------------------------
    const sliderContainer = document.getElementById('beforeAfterSlider');
    const beforeLayer = document.getElementById('beforeLayer');
    const sliderHandle = document.getElementById('sliderHandle');

    if (sliderContainer && beforeLayer && sliderHandle) {
        let isDragging = false;

        function moveSlider(x) {
            const containerRect = sliderContainer.getBoundingClientRect();
            let position = ((x - containerRect.left) / containerRect.width) * 100;

            if (position < 0) position = 0;
            if (position > 100) position = 100;

            beforeLayer.style.width = `${position}%`;
            sliderHandle.style.left = `${position}%`;
        }

        sliderHandle.addEventListener('mousedown', () => { isDragging = true; });
        window.addEventListener('mouseup', () => { isDragging = false; });

        sliderContainer.addEventListener('mousemove', (e) => {
            if (isDragging) {
                moveSlider(e.clientX);
            }
        });

        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', () => { isDragging = true; });
        window.addEventListener('touchend', () => { isDragging = false; });

        sliderContainer.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches[0]) {
                moveSlider(e.touches[0].clientX);
            }
        });
    }

    // ----------------------------------------------------------------------
    // 5. Navbar Styling on Scroll
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.padding = '8px 0';
            navbar.style.background = 'rgba(15, 27, 43, 0.96)';
        } else {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(15, 27, 43, 0.88)';
        }
    });

});
