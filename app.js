/* ==========================================================================
   Jackson Construction - Interactive Web Logic & Photorealistic 3D Showroom Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Service Category Filter Tabs
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.getElementById('servicesGrid');

    if (filterBtns.length > 0 && servicesGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                if (filterValue === 'all') {
                    servicesGrid.classList.remove('filtered');
                } else {
                    servicesGrid.classList.add('filtered');
                }

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
    }

    // ==========================================================================
    // 2. Interactive Calculator Logic
    // ==========================================================================
    const calcServices = document.getElementsByName('calc_service');
    const calcSizes = document.getElementsByName('calc_size');
    const priceRangeEl = document.getElementById('priceRange');
    const sendCalcWhatsappBtn = document.getElementById('sendCalcWhatsapp');

    const pricingMatrix = {
        'Remodelacion de Bano': {
            'Pequeno (1 Habitacion o Bano)': '$1,200 - $2,800',
            'Mediano (Area de 2 a 3 espacios)': '$2,800 - $5,500',
            'Grande (Propiedad o Casa Completa)': '$5,500 - $9,500+'
        },
        'Instalacion de Pisos': {
            'Pequeno (1 Habitacion o Bano)': '$800 - $1,800',
            'Mediano (Area de 2 a 3 espacios)': '$1,800 - $4,200',
            'Grande (Propiedad o Casa Completa)': '$4,200 - $8,500+'
        },
        'Demolicion y Escombros': {
            'Pequeno (1 Habitacion o Bano)': '$500 - $1,200',
            'Mediano (Area de 2 a 3 espacios)': '$1,200 - $2,900',
            'Grande (Propiedad o Casa Completa)': '$2,900 - $6,000+'
        },
        'Pintura General': {
            'Pequeno (1 Habitacion o Bano)': '$600 - $1,400',
            'Mediano (Area de 2 a 3 espacios)': '$1,400 - $3,200',
            'Grande (Propiedad o Casa Completa)': '$3,200 - $6,500+'
        },
        'Construccion General': {
            'Pequeno (1 Habitacion o Bano)': '$1,500 - $4,000',
            'Mediano (Area de 2 a 3 espacios)': '$4,000 - $9,500',
            'Grande (Propiedad o Casa Completa)': '$9,500 - $25,000+'
        }
    };

    function updateCalculatorPrice() {
        let selectedService = 'Remodelacion de Bano';
        let selectedSize = 'Pequeno (1 Habitacion o Bano)';

        calcServices.forEach(r => { if (r.checked) selectedService = r.value; });
        calcSizes.forEach(r => { if (r.checked) selectedSize = r.value; });

        const priceText = pricingMatrix[selectedService]?.[selectedSize] || '$800 - $2,500';
        if (priceRangeEl) priceRangeEl.innerText = `${priceText} USD`;

        if (sendCalcWhatsappBtn) {
            const whatsappMessage = encodeURIComponent(`Hola Jackson Construction, calculé mi proyecto en el cotizador de la web:\n- Servicio: ${selectedService}\n- Tamaño: ${selectedSize}\n- Estimado preliminar: ${priceText} USD.\nQuisiera agendar una visita para confirmar el presupuesto.`);
            sendCalcWhatsappBtn.setAttribute('onclick', `window.open('https://wa.me/17875130607?text=${whatsappMessage}', '_blank')`);
        }
    }

    if (calcServices.length > 0) {
        calcServices.forEach(r => r.addEventListener('change', updateCalculatorPrice));
        calcSizes.forEach(r => r.addEventListener('change', updateCalculatorPrice));
        updateCalculatorPrice();
    }

    // ==========================================================================
    // 3. Before & After Interactive Touch/Mouse Slider
    // ==========================================================================
    const sliderContainer = document.getElementById('beforeAfterSlider');
    const beforeLayer = document.getElementById('beforeLayer');
    const sliderHandle = document.getElementById('sliderHandle');
    let isSliding = false;

    if (sliderContainer && beforeLayer && sliderHandle) {
        function moveSlider(x) {
            const rect = sliderContainer.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            beforeLayer.style.width = `${position}%`;
            sliderHandle.style.left = `${position}%`;
        }

        sliderContainer.addEventListener('mousedown', (e) => { isSliding = true; moveSlider(e.clientX); });
        window.addEventListener('mouseup', () => { isSliding = false; });
        window.addEventListener('mousemove', (e) => { if (isSliding) moveSlider(e.clientX); });

        sliderContainer.addEventListener('touchstart', (e) => { isSliding = true; moveSlider(e.touches[0].clientX); });
        window.addEventListener('touchend', () => { isSliding = false; });
        window.addEventListener('touchmove', (e) => { if (isSliding) moveSlider(e.touches[0].clientX); });
    }

    // ==========================================================================
    // 4. PHOTOREALISTIC 3D SHOWROOM ENGINE (Hotspots & Material Switcher)
    // ==========================================================================
    const render3dImage = document.getElementById('render3dImage');
    const matBtns = document.querySelectorAll('.mat-btn');
    const matTitle = document.getElementById('matTitle');
    const matDesc = document.getElementById('matDesc');
    const quoteMaterialBtn = document.getElementById('quoteMaterialBtn');

    const showroomData = {
        carrara: {
            title: 'Porcelanato Mármol Carrara (Pisos y Paredes de Lujo)',
            desc: 'Losetas de mármol Carrara brillante en formato grande con vetas finas, ducha en cristal y grifería dorada.',
            img: 'assets/bathroom_carrara_3d.jpg'
        },
        slate: {
            title: 'Loseta Slate Piedra Negra Tropical Spa',
            desc: 'Piedra slate texturizada antideslizante con iluminación LED empotrada, cabina de cristal y bañera exenta.',
            img: 'assets/bathroom_slate_3d.jpg'
        },
        wood: {
            title: 'Vinyl Plank Roble Dorado Impermeable',
            desc: 'Piso de vinilo roble cálido resistente al agua 100%, lavamanos doble suspendido y ducha de cristal.',
            img: 'assets/bathroom_wood_3d.jpg'
        },
        goldmora: {
            title: 'Azulejo Calacatta Gold (Vetas Doradas)',
            desc: 'Mármol de ultralujo supremo con vetas de oro brillante para baños master residenciales de alto valor.',
            img: 'assets/bathroom_gold_3d.jpg'
        }
    };

    if (render3dImage && matBtns.length > 0) {
        matBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                matBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const matKey = btn.getAttribute('data-mat');
                const selectedMat = showroomData[matKey];

                if (selectedMat) {
                    render3dImage.style.opacity = '0.3';
                    render3dImage.style.transform = 'scale(1.03)';

                    setTimeout(() => {
                        render3dImage.src = selectedMat.img;
                        render3dImage.style.opacity = '1';
                        render3dImage.style.transform = 'scale(1)';

                        if (matTitle) matTitle.innerText = selectedMat.title;
                        if (matDesc) matDesc.innerText = selectedMat.desc;

                        if (quoteMaterialBtn) {
                            const msg = encodeURIComponent(`Hola Jackson Construction, vi el Showroom 3D en la web y me interesa cotizar una remodelación con ${selectedMat.title}.`);
                            quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;
                        }
                    }, 200);
                }
            });
        });
    }

    // Hotspot Pin Touch/Hover Logic for Mobile
    const hotspots = document.querySelectorAll('.hotspot-pin');
    hotspots.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            hotspots.forEach(p => { if (p !== pin) p.classList.remove('active'); });
            pin.classList.toggle('active');
        });
    });

    document.addEventListener('click', () => {
        hotspots.forEach(pin => pin.classList.remove('active'));
    });
});
