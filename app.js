/* ==========================================================================
   Jackson Construction - Interactive Web Engine & Sales Showroom
   Phase 1: Animated Stats Counters & Interactive FAQ Accordion
   Phase 2: Single-Page 100% Vector PDF Generator (html2pdf engine)
   Jackson: 787 513 0607 | Julio: 787 546 6234
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
    // 2. Animated Stats Counters (Phase 1)
    // ==========================================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            const duration = 1800; // 1.8 seconds
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.floor(easeProgress * target);

                stat.innerText = currentVal.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target.toLocaleString();
                }
            }
            requestAnimationFrame(updateCount);
        });
    }

    const statsSection = document.querySelector('.section-stats');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    animateStats();
                }
            });
        }, { threshold: 0.25 });

        statsObserver.observe(statsSection);
    } else if (statNumbers.length > 0) {
        animateStats();
    }

    // ==========================================================================
    // 3. Interactive FAQ Accordion (Phase 1)
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => i.classList.remove('active'));
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // ==========================================================================
    // 4. Interactive Calculator & 1-Page PDF Proforma Generator (Phase 2)
    // ==========================================================================
    const calcServices = document.getElementsByName('calc_service');
    const calcSizes = document.getElementsByName('calc_size');
    const priceRangeEl = document.getElementById('priceRange');
    const sendCalcJacksonBtn = document.getElementById('sendCalcJackson');
    const sendCalcJulioBtn = document.getElementById('sendCalcJulio');
    const openProformaModalBtn = document.getElementById('openProformaModalBtn');

    // Proforma Modal Elements
    const proformaModal = document.getElementById('proformaModal');
    const closeProformaBtn = document.getElementById('closeProformaBtn');
    const printProformaBtn = document.getElementById('printProformaBtn');
    const printableProforma = document.getElementById('printableProforma');
    const proformaFolio = document.getElementById('proformaFolio');
    const proformaDate = document.getElementById('proformaDate');
    const proformaServiceName = document.getElementById('proformaServiceName');
    const proformaServiceDesc = document.getElementById('proformaServiceDesc');
    const proformaScope = document.getElementById('proformaScope');
    const proformaTableTotal = document.getElementById('proformaTableTotal');
    const proformaTotalAmount = document.getElementById('proformaTotalAmount');
    const modalSendJackson = document.getElementById('modalSendJackson');
    const modalSendJulio = document.getElementById('modalSendJulio');

    const serviceDescriptions = {
        'Remodelacion de Bano': 'Demolición, losetas finas, plomería, mamparas de cristal y grifería.',
        'Instalacion de Pisos': 'Nivelación de contrapisos, losas de porcelanato, vinyl plank o cerámica.',
        'Demolicion y Escombros': 'Demolición segura de estructuras, paredes y desalojo total en camión.',
        'Pintura General': 'Preparación de paredes, corrección de grietas y sellado contra humedad tropical.',
        'Construccion General': 'Ampliaciones, levantamiento de paredes en bloque/gypsum y estructuras.'
    };

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

    // Generate unique session folio
    const uniqueFolioNumber = `#JC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    function getFormattedSpanishDate() {
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return today.toLocaleDateString('es-ES', options);
    }

    function updateCalculatorAndProforma() {
        let selectedService = 'Remodelacion de Bano';
        let selectedSize = 'Pequeno (1 Habitacion o Bano)';

        calcServices.forEach(r => { if (r.checked) selectedService = r.value; });
        calcSizes.forEach(r => { if (r.checked) selectedSize = r.value; });

        const priceText = pricingMatrix[selectedService]?.[selectedSize] || '$800 - $2,500';
        const formattedPrice = `${priceText} USD`;

        // Update Calculator Box
        if (priceRangeEl) priceRangeEl.innerText = formattedPrice;

        // Update Proforma Modal Elements
        if (proformaFolio) proformaFolio.innerText = uniqueFolioNumber;
        if (proformaDate) proformaDate.innerText = getFormattedSpanishDate();
        if (proformaServiceName) proformaServiceName.innerText = selectedService;
        if (proformaServiceDesc) proformaServiceDesc.innerText = serviceDescriptions[selectedService] || 'Mano de obra especializada y materiales de primera.';
        if (proformaScope) proformaScope.innerText = selectedSize;
        if (proformaTableTotal) proformaTableTotal.innerText = formattedPrice;
        if (proformaTotalAmount) proformaTotalAmount.innerText = formattedPrice;

        // WhatsApp Messages with Folio & Breakdown
        const msgJackson = encodeURIComponent(`Hola Jackson, generé mi Presupuesto Formal ${uniqueFolioNumber} en la página web:\n- Servicio: ${selectedService}\n- Alcance: ${selectedSize}\n- Estimado preliminar: ${formattedPrice}\nQuisiera agendar una visita en mi propiedad.`);
        const msgJulio = encodeURIComponent(`Hola Julio, generé mi Presupuesto Formal ${uniqueFolioNumber} en la página web:\n- Servicio: ${selectedService}\n- Alcance: ${selectedSize}\n- Estimado preliminar: ${formattedPrice}\nQuisiera agendar una visita en mi propiedad.`);

        // Direct Calculator Buttons
        if (sendCalcJacksonBtn) {
            sendCalcJacksonBtn.setAttribute('onclick', `window.open('https://wa.me/17875130607?text=${msgJackson}', '_blank')`);
        }
        if (sendCalcJulioBtn) {
            sendCalcJulioBtn.setAttribute('onclick', `window.open('https://wa.me/17875466234?text=${msgJulio}', '_blank')`);
        }

        // Modal Action Buttons
        if (modalSendJackson) modalSendJackson.href = `https://wa.me/17875130607?text=${msgJackson}`;
        if (modalSendJulio) modalSendJulio.href = `https://wa.me/17875466234?text=${msgJulio}`;
    }

    if (calcServices.length > 0) {
        calcServices.forEach(r => r.addEventListener('change', updateCalculatorAndProforma));
        calcSizes.forEach(r => r.addEventListener('change', updateCalculatorAndProforma));
        updateCalculatorAndProforma();
    }

    // Open/Close Proforma Modal
    if (openProformaModalBtn && proformaModal) {
        openProformaModalBtn.addEventListener('click', () => {
            updateCalculatorAndProforma();
            proformaModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeProformaBtn && proformaModal) {
        closeProformaBtn.addEventListener('click', () => {
            proformaModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (proformaModal) {
        proformaModal.addEventListener('click', (e) => {
            if (e.target === proformaModal) {
                proformaModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // 1-Page Direct PDF Generator Engine (html2pdf)
    if (printProformaBtn && printableProforma) {
        printProformaBtn.addEventListener('click', () => {
            const folioCode = (proformaFolio ? proformaFolio.innerText : 'JC-2026').replace('#', '').trim();
            const originalHtml = printProformaBtn.innerHTML;

            printProformaBtn.innerHTML = `<span>⏳ Generando PDF Oficial...</span>`;
            printProformaBtn.disabled = true;

            const opt = {
                margin:       [6, 6, 6, 6],
                filename:     `Presupuesto-Jackson-Construction-${folioCode}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#09101C' },
                jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
            };

            if (typeof html2pdf !== 'undefined') {
                html2pdf().set(opt).from(printableProforma).save().then(() => {
                    printProformaBtn.innerHTML = originalHtml;
                    printProformaBtn.disabled = false;
                }).catch(err => {
                    console.error('Error generating PDF:', err);
                    window.print();
                    printProformaBtn.innerHTML = originalHtml;
                    printProformaBtn.disabled = false;
                });
            } else {
                window.print();
                printProformaBtn.innerHTML = originalHtml;
                printProformaBtn.disabled = false;
            }
        });
    }

    // ==========================================================================
    // 5. Before & After Interactive Touch/Mouse Slider
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
    // 6. WEBGL 3D SHOWROOM ENGINE (Dual Contacts: Jackson & Julio)
    // ==========================================================================
    function init3DShowroomEngine() {
        const container3D = document.getElementById('canvas3dContainer');
        if (!container3D || typeof THREE === 'undefined') return;

        container3D.innerHTML = '';

        const width = container3D.clientWidth || 800;
        const height = container3D.clientHeight || 520;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 3.4);

        // WebGL Renderer with sRGB Encoding for Pure Vivid Colors
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = THREE.sRGBEncoding;
        container3D.appendChild(renderer.domElement);

        // Procedural Volumetric Depth Map
        function createDepthMap() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createRadialGradient(256, 256, 30, 256, 256, 320);
            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(0.6, '#666666');
            grad.addColorStop(1, '#000000');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 512, 512);

            return new THREE.CanvasTexture(canvas);
        }

        const depthTexture = createDepthMap();
        const textureLoader = new THREE.TextureLoader();

        // 100% PURE WHITE NEUTRAL LIGHTING (Zero Sepia / Zero Filtros)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
        scene.add(ambientLight);

        // Sales Copy Dictionary (High-End Remodeling Projects)
        const materialsData = {
            carrara: {
                title: 'Remodelación en Porcelanato Mármol Carrara',
                desc: 'Losetas de mármol Carrara brillante en formato grande, ducha en cristal templado y grifería de lujo para tu hogar.',
                img: 'assets/bathroom_carrara_3d.jpg'
            },
            slate: {
                title: 'Remodelación Tipo Spa en Slate Piedra Negra',
                desc: 'Piedra slate negra antideslizante de alta resistencia a la humedad con bañera exenta y accesorios italianos.',
                img: 'assets/bathroom_slate_3d.jpg'
            },
            wood: {
                title: 'Remodelación en Vinyl Plank Roble Dorado 100% Impermeable',
                desc: 'Textura cálida de madera de roble con lavamanos doble flotante y espejo LED circular.',
                img: 'assets/bathroom_wood_3d.jpg'
            },
            goldmora: {
                title: 'Remodelación de Ultralujo Calacatta Gold',
                desc: 'Mármol fino de gran formato con vetas de oro brillante para baños residenciales exclusivos.',
                img: 'assets/bathroom_gold_3d.jpg'
            }
        };

        let activeKey = 'carrara';
        const planeGeo = new THREE.PlaneGeometry(5.4, 3.1, 64, 64);

        const planeMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(materialsData[activeKey].img),
            displacementMap: depthTexture,
            displacementScale: 0.22,
            roughness: 0.2,
            metalness: 0.05
        });

        const planeMesh = new THREE.Mesh(planeGeo, planeMat);
        scene.add(planeMesh);

        // Mouse & Touch Parallax Motion
        let mouseX = 0, mouseY = 0;
        let targetRotX = 0, targetRotY = 0;

        container3D.addEventListener('mousemove', (e) => {
            const rect = container3D.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        });

        container3D.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const rect = container3D.getBoundingClientRect();
                mouseX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
                mouseY = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);
            }
        });

        // Material Switcher Event Listeners
        const matBtns = document.querySelectorAll('.mat-btn');
        const matTitle = document.getElementById('matTitle');
        const matDesc = document.getElementById('matDesc');
        const quoteJacksonBtn = document.getElementById('quoteJacksonBtn');
        const quoteJulioBtn = document.getElementById('quoteJulioBtn');

        matBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                matBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                activeKey = btn.getAttribute('data-mat');
                const sel = materialsData[activeKey];

                if (sel) {
                    textureLoader.load(sel.img, (newTex) => {
                        planeMat.map = newTex;
                        planeMat.needsUpdate = true;
                    });

                    if (matTitle) matTitle.innerText = sel.title;
                    if (matDesc) matDesc.innerText = sel.desc;

                    if (quoteJacksonBtn) {
                        const msgJ = encodeURIComponent(`Hola Jackson, me interesa cotizar un proyecto de remodelacion de bano con el acabado ${sel.title}.`);
                        quoteJacksonBtn.href = `https://wa.me/17875130607?text=${msgJ}`;
                    }
                    if (quoteJulioBtn) {
                        const msgJu = encodeURIComponent(`Hola Julio, me interesa cotizar un proyecto de remodelacion de bano con el acabado ${sel.title}.`);
                        quoteJulioBtn.href = `https://wa.me/17875466234?text=${msgJu}`;
                    }
                }
            });
        });

        // 60FPS Parallax Motion Loop
        function animate() {
            requestAnimationFrame(animate);

            targetRotX = mouseY * 0.16;
            targetRotY = mouseX * 0.22;

            planeMesh.rotation.x += (targetRotX - planeMesh.rotation.x) * 0.08;
            planeMesh.rotation.y += (targetRotY - planeMesh.rotation.y) * 0.08;

            renderer.render(scene, camera);
        }
        animate();

        // Window Resize
        window.addEventListener('resize', () => {
            if (container3D) {
                const w = container3D.clientWidth;
                const h = container3D.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            }
        });
    }

    // Initialize Showroom Engine
    init3DShowroomEngine();
    window.addEventListener('load', init3DShowroomEngine);

    // Touch/Click Tooltip logic for Hotspots
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

    // Floating WhatsApp Popup toggle
    const waFloatBtn = document.getElementById('waFloatBtn');
    const waPopupMenu = document.getElementById('waPopupMenu');
    if (waFloatBtn && waPopupMenu) {
        waFloatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waPopupMenu.classList.toggle('show');
        });
        document.addEventListener('click', () => {
            waPopupMenu.classList.remove('show');
        });
    }
});
