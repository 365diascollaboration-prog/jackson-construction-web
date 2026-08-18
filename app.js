/* ==========================================================================
   Jackson Construction - Interactive Web Engine & Sales Showroom
   100% Commercial Sales Copy - High-End Remodeling Projects in PR
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
            const whatsappMessage = encodeURIComponent(`Hola Jackson Construction, calculé mi proyecto en la página web:\n- Servicio: ${selectedService}\n- Tamaño: ${selectedSize}\n- Estimado preliminar: ${priceText} USD.\nQuisiera agendar una visita en mi propiedad para cotizar.`);
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
    // 4. WEBGL 3D SHOWROOM ENGINE (Sales-Focused High-End Copy)
    // ==========================================================================
    function init3DShowroomSalesEngine() {
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

        // 100% PURE WHITE NEUTRAL LIGHTING (Cero Sepia / Cero Filtros)
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
        const quoteMaterialBtn = document.getElementById('quoteMaterialBtn');

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

                    if (quoteMaterialBtn) {
                        const msg = encodeURIComponent(`Hola Jackson Construction, me interesa cotizar un proyecto de remodelacion de bano con el acabado ${sel.title}.`);
                        quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;
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

    // Initialize Sales Engine
    init3DShowroomSalesEngine();
    window.addEventListener('load', init3DShowroomSalesEngine);

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
});
