/* ==========================================================================
   Jackson Construction - Three.js WebGL 3D Depth & Camera Walkthrough Engine (Idea 1 + 3)
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
    // 4. COMBINED 3D FUSION ENGINE (Idea 1 Depth Mesh + Idea 3 Camera Walkthrough)
    // ==========================================================================
    function initCombined3DFusionEngine() {
        const container3D = document.getElementById('canvas3dContainer');
        if (!container3D || typeof THREE === 'undefined') return;

        container3D.innerHTML = '';

        const width = container3D.clientWidth || 800;
        const height = container3D.clientHeight || 520;

        // Scene & Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        
        // Initial Cinematic Camera Target Position
        const targetCamPos = new THREE.Vector3(0, 0, 3.2);
        const currentCamPos = new THREE.Vector3(0, 0, 4.8); // Starts further back for fly-in
        camera.position.copy(currentCamPos);

        // WebGL Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container3D.appendChild(renderer.domElement);

        // Procedural Depth Map Generator (Creates grayscale 3D volume mapping)
        function createDepthMap() {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 300);
            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(0.5, '#777777');
            grad.addColorStop(1, '#000000');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 512, 512);

            return new THREE.CanvasTexture(canvas);
        }

        const depthTexture = createDepthMap();
        const textureLoader = new THREE.TextureLoader();

        // Material Renders Dictionary
        const materialsData = {
            carrara: {
                title: 'Porcelanato Mármol Carrara (Recorrido 3D & Profundidad)',
                desc: 'Navega en 3D por la remodelación completa: ducha en cristal templado, losetas de mármol Carrara y mueble flotante con iluminación LED.',
                img: 'assets/bathroom_carrara_3d.jpg'
            },
            slate: {
                title: 'Loseta Slate Piedra Negra Spa (Recorrido 3D & Profundidad)',
                desc: 'Experiencia 3D con piedra negra slate antideslizante, grifería italiana mate y bañera exenta estilo spa.',
                img: 'assets/bathroom_slate_3d.jpg'
            },
            wood: {
                title: 'Vinyl Plank Roble Dorado (Recorrido 3D & Profundidad)',
                desc: 'Explora en 3D la calidez del piso de vinilo roble resistente al agua 100% con espejo circular LED y lavamanos doble.',
                img: 'assets/bathroom_wood_3d.jpg'
            },
            goldmora: {
                title: 'Azulejo Calacatta Gold (Recorrido 3D & Profundidad)',
                desc: 'Mármol de ultralujo con vetas de oro brillante para baños master residenciales de alto nivel.',
                img: 'assets/bathroom_gold_3d.jpg'
            }
        };

        // Load Initial Texture & Create 3D Volumetric Mesh Plane
        let activeKey = 'carrara';
        const planeGeo = new THREE.PlaneGeometry(5.2, 3.0, 64, 64);

        const planeMat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(materialsData[activeKey].img),
            displacementMap: depthTexture,
            displacementScale: 0.25,
            roughness: 0.15,
            metalness: 0.1
        });

        const planeMesh = new THREE.Mesh(planeGeo, planeMat);
        scene.add(planeMesh);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xf5a623, 1.5, 10);
        pointLight.position.set(0, 0, 3);
        scene.add(pointLight);

        // Parallax Mouse & Touch Interaction (Idea 1)
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

        // Hotspot Camera Walkthrough Targets (Idea 3 Zoom-To Positions)
        const hotspotCameraTargets = {
            shower: new THREE.Vector3(0.8, -0.3, 2.2),   // Zoom to Shower Glass
            vanity: new THREE.Vector3(-0.4, -0.1, 2.4),  // Zoom to Vanity LED Mirror
            tub: new THREE.Vector3(-1.2, 0.4, 2.3),      // Zoom to Soaking Tub
            floor: new THREE.Vector3(0.0, 0.6, 2.5)      // Zoom to Tiled Floor
        };

        // Material Switcher Buttons
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
                        const msg = encodeURIComponent(`Hola Jackson Construction, vi el Recorrido 3D en la web y me interesa cotizar una remodelación con ${sel.title}.`);
                        quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;
                    }

                    // Reset Camera Fly-To Position on material change
                    targetCamPos.set(0, 0, 3.2);
                }
            });
        });

        // Hotspot Camera Glide Listeners (Idea 3 Camera Fly-To)
        const hotspots = document.querySelectorAll('.hotspot-pin');
        hotspots.forEach(pin => {
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                hotspots.forEach(p => { if (p !== pin) p.classList.remove('active'); });
                pin.classList.toggle('active');

                const targetType = pin.getAttribute('data-target');
                if (hotspotCameraTargets[targetType]) {
                    targetCamPos.copy(hotspotCameraTargets[targetType]);
                }
            });
        });

        container3D.addEventListener('click', () => {
            // Reset Camera Glide to main view
            targetCamPos.set(0, 0, 3.2);
        });

        // 60FPS Animation Loop with Smooth Camera Glide & Parallax Shift
        function animate() {
            requestAnimationFrame(animate);

            // 1. Smooth Camera Fly-To Interpolation (Idea 3)
            camera.position.lerp(targetCamPos, 0.06);

            // 2. Volumetric Parallax Mesh Rotation (Idea 1)
            targetRotX = mouseY * 0.14;
            targetRotY = mouseX * 0.20;

            planeMesh.rotation.x += (targetRotX - planeMesh.rotation.x) * 0.08;
            planeMesh.rotation.y += (targetRotY - planeMesh.rotation.y) * 0.08;

            // Point light moves with user cursor
            pointLight.position.x = mouseX * 3;
            pointLight.position.y = mouseY * 2;

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

    // Initialize 3D Engine
    initCombined3DFusionEngine();
    window.addEventListener('load', initCombined3DFusionEngine);
});
