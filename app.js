/* ==========================================================================
   Jackson Construction - Interactive Web Logic & Three.js 3D Material Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Service Category Filter Tabs
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesGrid = document.getElementById('servicesGrid');

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

    // ==========================================================================
    // 2. Interactive Calculator Logic
    // ==========================================================================
    const calcServices = document.getElementsByName('calc_service');
    const calcSizes = document.getElementsByName('calc_size');
    const priceRangeEl = document.getElementById('priceRange');
    const resultDetailsEl = document.getElementById('resultDetails');
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
        priceRangeEl.innerText = `${priceText} USD`;

        const whatsappMessage = encodeURIComponent(`Hola Jackson Construction, calculé mi proyecto en el cotizador de la web:\n- Servicio: ${selectedService}\n- Tamaño: ${selectedSize}\n- Estimado preliminar: ${priceText} USD.\nQuisiera agendar una visita para confirmar el presupuesto.`);
        sendCalcWhatsappBtn.setAttribute('onclick', `window.open('https://wa.me/17875130607?text=${whatsappMessage}', '_blank')`);
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
    // 4. THREE.JS 3D MATERIAL ENGINE (Interactive WebGL Tile Viewer)
    // ==========================================================================
    const container3D = document.getElementById('canvas3dContainer');

    if (container3D && typeof THREE !== 'undefined') {
        // Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container3D.clientWidth / container3D.clientHeight, 0.1, 1000);
        camera.position.set(0, 2.8, 4.2);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container3D.clientWidth, container3D.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container3D.appendChild(renderer.domElement);

        // Controls
        let controls;
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.2;
            controls.maxPolarAngle = Math.PI / 2.1;
            controls.minDistance = 2;
            controls.maxDistance = 7;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xfff0d0, 1.4);
        mainLight.position.set(5, 8, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);

        const goldFillLight = new THREE.PointLight(0xf5a623, 1.2, 10);
        goldFillLight.position.set(-4, 3, -3);
        scene.add(goldFillLight);

        // Procedural Texture Generator Function
        function createProceduralTexture(type) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            if (type === 'carrara') {
                ctx.fillStyle = '#FAFAFA';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(160, 165, 175, 0.35)';
                ctx.lineWidth = 3;
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * 512, 0);
                    ctx.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
                    ctx.stroke();
                }
            } else if (type === 'slate') {
                ctx.fillStyle = '#1D2128';
                ctx.fillRect(0, 0, 512, 512);
                for (let i = 0; i < 2000; i++) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
                    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 12, Math.random() * 3);
                }
            } else if (type === 'wood') {
                ctx.fillStyle = '#B87E38';
                ctx.fillRect(0, 0, 512, 512);
                ctx.fillStyle = 'rgba(100, 55, 15, 0.25)';
                for (let y = 0; y < 512; y += 12) {
                    ctx.fillRect(0, y + (Math.sin(y) * 4), 512, 6);
                }
            } else if (type === 'goldmora') {
                ctx.fillStyle = '#FDFDFD';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(212, 150, 20, 0.6)';
                ctx.lineWidth = 5;
                for (let i = 0; i < 6; i++) {
                    ctx.beginPath();
                    ctx.moveTo(0, Math.random() * 512);
                    ctx.bezierCurveTo(170, Math.random() * 512, 340, Math.random() * 512, 512, Math.random() * 512);
                    ctx.stroke();
                }
            }

            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            return texture;
        }

        // Materials Dictionary
        const materialsData = {
            carrara: {
                title: 'Porcelanato Mármol Carrara Blanqueado',
                desc: 'Ideal para baños de lujo, pisos principales y paredes de ducha. Acabado brillante con vetas grises finas.',
                texture: createProceduralTexture('carrara'),
                roughness: 0.1,
                metalness: 0.1
            },
            slate: {
                title: 'Loseta Slate Piedra Negra Tropical',
                desc: 'Piedra de alta durabilidad antideslizante para exteriores, terrazas y duchas de estilo moderno.',
                texture: createProceduralTexture('slate'),
                roughness: 0.75,
                metalness: 0.05
            },
            wood: {
                title: 'Vinyl Plank Roble Dorado Impermeable',
                desc: 'Apariencia de madera cálida resistente al agua 100%, perfecta para salas, dormitorios y oficinas.',
                texture: createProceduralTexture('wood'),
                roughness: 0.4,
                metalness: 0.05
            },
            goldmora: {
                title: 'Azulejo Calacatta Gold Vetas Doradas',
                desc: 'Acabado de lujo supremo con vetas de oro brillante para baños master y cocinas ejecutivas.',
                texture: createProceduralTexture('goldmora'),
                roughness: 0.08,
                metalness: 0.25
            }
        };

        // Create 3D Bevelled Slab Mesh
        const geometry = new THREE.BoxGeometry(2.4, 0.18, 2.4);
        let currentMaterialKey = 'carrara';
        const matInfo = materialsData[currentMaterialKey];

        const tileMaterial = new THREE.MeshStandardMaterial({
            map: matInfo.texture,
            roughness: matInfo.roughness,
            metalness: matInfo.metalness
        });

        const tileMesh = new THREE.Mesh(geometry, tileMaterial);
        tileMesh.castShadow = true;
        tileMesh.receiveShadow = true;
        scene.add(tileMesh);

        // Ground Shadow Plane
        const shadowPlaneGeo = new THREE.PlaneGeometry(10, 10);
        const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.3 });
        const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -0.12;
        shadowPlane.receiveShadow = true;
        scene.add(shadowPlane);

        // Material Switcher Event Listeners
        const matBtns = document.querySelectorAll('.mat-btn');
        const matTitle = document.getElementById('matTitle');
        const matDesc = document.getElementById('matDesc');
        const quoteMaterialBtn = document.getElementById('quoteMaterialBtn');

        matBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                matBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const matKey = btn.getAttribute('data-mat');
                const selectedMat = materialsData[matKey];

                if (selectedMat) {
                    tileMaterial.map = selectedMat.texture;
                    tileMaterial.roughness = selectedMat.roughness;
                    tileMaterial.metalness = selectedMat.metalness;
                    tileMaterial.needsUpdate = true;

                    matTitle.innerText = selectedMat.title;
                    matDesc.innerText = selectedMat.desc;

                    const msg = encodeURIComponent(`Hola Jackson Construction, vi el Visor 3D en la web y me interesa cotizar un proyecto con ${selectedMat.title}.`);
                    quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;

                    // Small bounce animation
                    tileMesh.position.y = 0.3;
                }
            });
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            if (controls) controls.update();
            tileMesh.position.y += (0 - tileMesh.position.y) * 0.1;
            renderer.render(scene, camera);
        }
        animate();

        // Responsive Resize
        window.addEventListener('resize', () => {
            if (container3D) {
                camera.aspect = container3D.clientWidth / container3D.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container3D.clientWidth, container3D.clientHeight);
            }
        });
    }
});
