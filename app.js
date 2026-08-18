/* ==========================================================================
   Jackson Construction - Full 3D Architectural Remodeling Engine (Three.js WebGL)
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
    // 4. FULL 3D ARCHITECTURAL SHOWCASE ENGINE (Three.js WebGL)
    //    Renders: 3D Bathroom, 3D Toilet, 3D Glass Shower Doors, 3D Window, 3D Vanity, 3D Floor Tiles
    // ==========================================================================
    function init3DArchitecturalViewer() {
        const container3D = document.getElementById('canvas3dContainer');
        if (!container3D || typeof THREE === 'undefined') return;

        // Clear existing canvas if any
        container3D.innerHTML = '';

        // Scene & Camera
        const scene = new THREE.Scene();
        const width = container3D.clientWidth || 800;
        const height = container3D.clientHeight || 420;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(3.5, 3.2, 4.8);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container3D.appendChild(renderer.domElement);

        // OrbitControls
        let controls;
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;
            controls.target.set(0, 0.8, 0);
            controls.maxPolarAngle = Math.PI / 2.05;
            controls.minDistance = 2.5;
            controls.maxDistance = 8.0;
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
        scene.add(ambientLight);

        const mainSpotLight = new THREE.SpotLight(0xfff5e0, 1.8);
        mainSpotLight.position.set(4, 7, 4);
        mainSpotLight.castShadow = true;
        mainSpotLight.shadow.mapSize.width = 1024;
        mainSpotLight.shadow.mapSize.height = 1024;
        scene.add(mainSpotLight);

        const warmLight = new THREE.PointLight(0xf5a623, 1.2, 12);
        warmLight.position.set(-3, 4, -2);
        scene.add(warmLight);

        // Texture Generator
        function createTexture(type) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            if (type === 'carrara') {
                ctx.fillStyle = '#F8F9FA';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(170, 175, 185, 0.4)';
                ctx.lineWidth = 4;
                for (let i = 0; i < 7; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * 512, 0);
                    ctx.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
                    ctx.stroke();
                }
            } else if (type === 'slate') {
                ctx.fillStyle = '#1E222A';
                ctx.fillRect(0, 0, 512, 512);
                for (let i = 0; i < 1500; i++) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.09})`;
                    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 14, Math.random() * 3);
                }
            } else if (type === 'wood') {
                ctx.fillStyle = '#B57D3A';
                ctx.fillRect(0, 0, 512, 512);
                ctx.fillStyle = 'rgba(90, 50, 15, 0.28)';
                for (let y = 0; y < 512; y += 14) {
                    ctx.fillRect(0, y + (Math.sin(y) * 4), 512, 7);
                }
            } else if (type === 'goldmora') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(215, 155, 25, 0.65)';
                ctx.lineWidth = 6;
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
            texture.repeat.set(2, 2);
            return texture;
        }

        // Materials Data
        const materialsData = {
            carrara: {
                title: 'Porcelanato Mármol Carrara (Pisos y Paredes 3D)',
                desc: 'Losetas de mármol Carrara brillante en 3D con vetas finas para baños completos y espacios modernos.',
                texture: createTexture('carrara'),
                roughness: 0.1,
                metalness: 0.1
            },
            slate: {
                title: 'Loseta Slate Piedra Negra Antideslizante',
                desc: 'Piedra slate texturizada en 3D ideal para duchas elegantes, pisos exteriores y remodelaciones.',
                texture: createTexture('slate'),
                roughness: 0.7,
                metalness: 0.05
            },
            wood: {
                title: 'Vinyl Plank Roble Dorado Impermeable',
                desc: 'Piso de vinilo roble en 3D resistente al agua 100%, ideal para baños de revista y habitaciones.',
                texture: createTexture('wood'),
                roughness: 0.35,
                metalness: 0.05
            },
            goldmora: {
                title: 'Azulejo Calacatta Gold (Vetas Doradas)',
                desc: 'Mármol de ultralujo con vetas de oro brillante para baños master y remodelaciones residenciales.',
                texture: createTexture('goldmora'),
                roughness: 0.08,
                metalness: 0.2
            }
        };

        // Current Active Material
        let activeMatKey = 'carrara';
        const floorMat = new THREE.MeshStandardMaterial({
            map: materialsData[activeMatKey].texture,
            roughness: materialsData[activeMatKey].roughness,
            metalness: materialsData[activeMatKey].metalness
        });

        // 1. FLOOR TILES (Pisos en 3D)
        const floorGeo = new THREE.BoxGeometry(4.2, 0.12, 4.2);
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.position.set(0, -0.06, 0);
        floorMesh.receiveShadow = true;
        scene.add(floorMesh);

        // 2. WALLS (Paredes de Baño)
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x182436, roughness: 0.3 });
        
        // Back Wall
        const backWallGeo = new THREE.BoxGeometry(4.2, 2.8, 0.12);
        const backWall = new THREE.Mesh(backWallGeo, wallMat);
        backWall.position.set(0, 1.4, -2.1);
        backWall.receiveShadow = true;
        scene.add(backWall);

        // Side Wall
        const sideWallGeo = new THREE.BoxGeometry(0.12, 2.8, 4.2);
        const sideWall = new THREE.Mesh(sideWallGeo, wallMat);
        sideWall.position.set(-2.1, 1.4, 0);
        sideWall.receiveShadow = true;
        scene.add(sideWall);

        // 3. TOILET 3D (Sanitario de Cerámica en 3D)
        const toiletGroup = new THREE.Group();
        const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xF8F9FA, roughness: 0.15, metalness: 0.05 });
        const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xF5A623, roughness: 0.2, metalness: 0.8 });

        // Bowl
        const bowlGeo = new THREE.CylinderGeometry(0.32, 0.24, 0.45, 24);
        const bowl = new THREE.Mesh(bowlGeo, ceramicMat);
        bowl.position.set(0, 0.225, 0);
        bowl.castShadow = true;
        toiletGroup.add(bowl);

        // Tank
        const tankGeo = new THREE.BoxGeometry(0.52, 0.65, 0.28);
        const tank = new THREE.Mesh(tankGeo, ceramicMat);
        tank.position.set(0, 0.65, -0.28);
        tank.castShadow = true;
        toiletGroup.add(tank);

        // Flush Button (Boton Dorado)
        const flushGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
        const flushBtn = new THREE.Mesh(flushGeo, goldAccentMat);
        flushBtn.position.set(0, 0.99, -0.28);
        toiletGroup.add(flushBtn);

        toiletGroup.position.set(1.1, 0, -1.5);
        scene.add(toiletGroup);

        // 4. GLASS SHOWER ENCLOSURE 3D (Ducha con Puertas de Cristal)
        const showerGroup = new THREE.Group();
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xE8F4FF,
            transparent: true,
            opacity: 0.45,
            roughness: 0.05,
            transmission: 0.9,
            ior: 1.5,
            reflectivity: 0.9
        });

        // Glass Door Panel
        const glassDoorGeo = new THREE.BoxGeometry(0.04, 2.2, 1.4);
        const glassDoor = new THREE.Mesh(glassDoorGeo, glassMat);
        glassDoor.position.set(0, 1.1, 0);
        showerGroup.add(glassDoor);

        // Chrome/Gold Shower Handle
        const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 16);
        const handle = new THREE.Mesh(handleGeo, goldAccentMat);
        handle.position.set(0.04, 1.1, 0.3);
        showerGroup.add(handle);

        // Shower Head (Ducha de Lujo)
        const pipeGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 16);
        const pipe = new THREE.Mesh(pipeGeo, goldAccentMat);
        pipe.position.set(-0.6, 2.1, -0.4);
        pipe.rotation.z = Math.PI / 4;
        showerGroup.add(pipe);

        const headGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24);
        const head = new THREE.Mesh(headGeo, goldAccentMat);
        head.position.set(-0.4, 1.9, -0.4);
        showerGroup.add(head);

        showerGroup.position.set(-0.7, 0, 0.4);
        scene.add(showerGroup);

        // 5. GLASS WINDOW 3D (Ventana de Cristal en la Pared)
        const windowGroup = new THREE.Group();
        const windowFrameGeo = new THREE.BoxGeometry(1.2, 0.9, 0.08);
        const windowFrameMat = new THREE.MeshStandardMaterial({ color: 0x0F1B2B, roughness: 0.3 });
        const windowFrame = new THREE.Mesh(windowFrameGeo, windowFrameMat);
        windowGroup.add(windowFrame);

        const windowGlassGeo = new THREE.BoxGeometry(1.05, 0.75, 0.02);
        const windowGlass = new THREE.Mesh(windowGlassGeo, glassMat);
        windowGroup.add(windowGlass);

        windowGroup.position.set(-0.3, 1.8, -2.05);
        scene.add(windowGroup);

        // 6. VANITY SINK & MIRROR 3D (Mueble y Espejo de Baño)
        const vanityGroup = new THREE.Group();
        
        // Countertop
        const counterGeo = new THREE.BoxGeometry(1.1, 0.12, 0.55);
        const counterMat = new THREE.MeshStandardMaterial({ color: 0x0B131F, roughness: 0.2 });
        const counter = new THREE.Mesh(counterGeo, counterMat);
        counter.position.set(0, 0.75, 0);
        counter.castShadow = true;
        vanityGroup.add(counter);

        // Vessel Sink (Lavamanos 3D)
        const sinkGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.16, 24);
        const sink = new THREE.Mesh(sinkGeo, ceramicMat);
        sink.position.set(0, 0.89, 0);
        sink.castShadow = true;
        vanityGroup.add(sink);

        // Mirror (Espejo 3D con Luz)
        const mirrorGeo = new THREE.BoxGeometry(0.85, 1.0, 0.04);
        const mirrorMat = new THREE.MeshStandardMaterial({ color: 0xD0E2FF, roughness: 0.05, metalness: 0.95 });
        const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
        mirror.position.set(0, 1.7, -0.24);
        vanityGroup.add(mirror);

        vanityGroup.position.set(-1.75, 0, -0.9);
        vanityGroup.rotation.y = Math.PI / 2;
        scene.add(vanityGroup);

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
                    floorMat.map = selectedMat.texture;
                    floorMat.roughness = selectedMat.roughness;
                    floorMat.metalness = selectedMat.metalness;
                    floorMat.needsUpdate = true;

                    if (matTitle) matTitle.innerText = selectedMat.title;
                    if (matDesc) matDesc.innerText = selectedMat.desc;

                    if (quoteMaterialBtn) {
                        const msg = encodeURIComponent(`Hola Jackson Construction, vi el Modelo 3D en la web y me interesa cotizar una remodelación con ${selectedMat.title}.`);
                        quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;
                    }
                }
            });
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            if (controls) controls.update();
            renderer.render(scene, camera);
        }
        animate();

        // Responsive Resize
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

    // Initialize 3D Engine immediately & on window load
    init3DArchitecturalViewer();
    window.addEventListener('load', init3DArchitecturalViewer);
});
