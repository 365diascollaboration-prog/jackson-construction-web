/* ==========================================================================
   Jackson Construction - Pure 3D Geometry Bathroom Engine (GLTF / Studio Lit 3D)
   No Sepia Tint - Neutral Studio Lights - 100% Pure Crisp 3D Geometry
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
    // 4. PURE 3D GEOMETRY BATHROOM ENGINE (Three.js WebGL + Studio Lighting)
    //    100% Pure Crisp Colors - No Sepia Tint - Real 3D Objects & Orbit Controls
    // ==========================================================================
    function initPure3DStudioEngine() {
        const container3D = document.getElementById('canvas3dContainer');
        if (!container3D || typeof THREE === 'undefined') return;

        container3D.innerHTML = '';

        const width = container3D.clientWidth || 800;
        const height = container3D.clientHeight || 500;

        // Scene & Camera
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(3.2, 2.6, 4.4);

        // WebGL Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
        container3D.appendChild(renderer.domElement);

        // OrbitControls (Smooth 360° Interaction)
        let controls;
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;
            controls.target.set(0, 0.6, 0);
            controls.maxPolarAngle = Math.PI / 2.05;
            controls.minDistance = 2.0;
            controls.maxDistance = 7.5;
        }

        // NEUTRAL STUDIO LIGHTING (Cero Sepia / Cero Tinte Naranja)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95); // Pure Crisp White
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.4); // Main Studio Light
        keyLight.position.set(5, 8, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0.6); // Cool Soft Fill
        fillLight.position.set(-4, 5, -3);
        scene.add(fillLight);

        // Texture Generator (Pure High Definition Textures)
        function createHDTexture(type) {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            if (type === 'carrara') {
                ctx.fillStyle = '#FAFAFA';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(160, 165, 175, 0.35)';
                ctx.lineWidth = 4;
                for (let i = 0; i < 8; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * 512, 0);
                    ctx.bezierCurveTo(Math.random() * 512, 170, Math.random() * 512, 340, Math.random() * 512, 512);
                    ctx.stroke();
                }
            } else if (type === 'slate') {
                ctx.fillStyle = '#1A1E24';
                ctx.fillRect(0, 0, 512, 512);
                for (let i = 0; i < 1800; i++) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
                    ctx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 12, Math.random() * 3);
                }
            } else if (type === 'wood') {
                ctx.fillStyle = '#BA8240';
                ctx.fillRect(0, 0, 512, 512);
                ctx.fillStyle = 'rgba(85, 45, 10, 0.25)';
                for (let y = 0; y < 512; y += 14) {
                    ctx.fillRect(0, y + (Math.sin(y) * 4), 512, 7);
                }
            } else if (type === 'goldmora') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 512, 512);
                ctx.strokeStyle = 'rgba(215, 155, 25, 0.6)';
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
            texture.repeat.set(2, 2);
            return texture;
        }

        // Materials Dictionary
        const materialsData = {
            carrara: {
                title: 'Porcelanato Mármol Carrara (Modelo 3D Real)',
                desc: 'Geometría 3D pura con porcelanato Carrara blanco brillante, sanitario de cerámica y ducha de cristal.',
                texture: createHDTexture('carrara'),
                roughness: 0.1,
                metalness: 0.1
            },
            slate: {
                title: 'Loseta Slate Piedra Negra Tropical (Modelo 3D Real)',
                desc: 'Piedra slate negra 3D con grifería dorada, mampara de cristal sin marcos y mueble flotante.',
                texture: createHDTexture('slate'),
                roughness: 0.65,
                metalness: 0.05
            },
            wood: {
                title: 'Vinyl Plank Roble Dorado Impermeable (Modelo 3D Real)',
                desc: 'Piso de vinilo roble en 3D con lavamanos de cerámica blanca y marco de espejo iluminado.',
                texture: createHDTexture('wood'),
                roughness: 0.35,
                metalness: 0.05
            },
            goldmora: {
                title: 'Azulejo Calacatta Gold Vetas Doradas (Modelo 3D Real)',
                desc: 'Mármol de ultralujo supremo con vetas de oro brillante para remodelaciones de residencias exclusivas.',
                texture: createHDTexture('goldmora'),
                roughness: 0.08,
                metalness: 0.2
            }
        };

        // Active Material
        let activeKey = 'carrara';
        const floorMat = new THREE.MeshStandardMaterial({
            map: materialsData[activeKey].texture,
            roughness: materialsData[activeKey].roughness,
            metalness: materialsData[activeKey].metalness
        });

        // 1. PURE 3D FLOOR (Piso 3D)
        const floorGeo = new THREE.BoxGeometry(4.0, 0.1, 4.0);
        const floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.position.set(0, -0.05, 0);
        floorMesh.receiveShadow = true;
        scene.add(floorMesh);

        // 2. PURE 3D WALLS (Paredes de Baño)
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x141F30, roughness: 0.3 });
        
        const backWall = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.6, 0.1), wallMat);
        backWall.position.set(0, 1.3, -2.0);
        backWall.receiveShadow = true;
        scene.add(backWall);

        const sideWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.6, 4.0), wallMat);
        sideWall.position.set(-2.0, 1.3, 0);
        sideWall.receiveShadow = true;
        scene.add(sideWall);

        // 3. PURE 3D CERAMIC TOILET (Sanitario 3D Blanco Puro)
        const toiletGroup = new THREE.Group();
        const ceramicMat = new THREE.MeshPhysicalMaterial({
            color: 0xFFFFFF,
            roughness: 0.1,
            metalness: 0.02,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xF5A623, metalness: 0.85, roughness: 0.2 });

        // Bowl
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.24, 0.44, 24), ceramicMat);
        bowl.position.set(0, 0.22, 0);
        bowl.castShadow = true;
        toiletGroup.add(bowl);

        // Tank
        const tank = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.62, 0.26), ceramicMat);
        tank.position.set(0, 0.64, -0.26);
        tank.castShadow = true;
        toiletGroup.add(tank);

        // Flush Button
        const flushBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16), goldMat);
        flushBtn.position.set(0, 0.96, -0.26);
        toiletGroup.add(flushBtn);

        toiletGroup.position.set(1.1, 0, -1.4);
        scene.add(toiletGroup);

        // 4. PURE 3D FRAMELESS GLASS SHOWER (Ducha de Cristal Templado 3D)
        const showerGroup = new THREE.Group();
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.35,
            roughness: 0.05,
            transmission: 0.95,
            ior: 1.5,
            reflectivity: 0.9
        });

        // Glass Door Panel
        const glassDoor = new THREE.Mesh(new THREE.BoxGeometry(0.03, 2.1, 1.3), glassMat);
        glassDoor.position.set(0, 1.05, 0);
        showerGroup.add(glassDoor);

        // Gold Handle
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.38, 16), goldMat);
        handle.position.set(0.04, 1.05, 0.3);
        showerGroup.add(handle);

        // Luxury Shower Head
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 16), goldMat);
        pipe.position.set(-0.55, 2.0, -0.4);
        pipe.rotation.z = Math.PI / 4;
        showerGroup.add(pipe);

        const showerHead = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.03, 24), goldMat);
        showerHead.position.set(-0.35, 1.8, -0.4);
        showerGroup.add(showerHead);

        showerGroup.position.set(-0.65, 0, 0.35);
        scene.add(showerGroup);

        // 5. PURE 3D GLASS WINDOW (Ventana de Cristal 3D)
        const windowGroup = new THREE.Group();
        const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.85, 0.06), new THREE.MeshStandardMaterial({ color: 0x0B131F, roughness: 0.2 }));
        windowGroup.add(windowFrame);

        const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.72, 0.02), glassMat);
        windowGroup.add(windowGlass);

        windowGroup.position.set(-0.25, 1.7, -1.96);
        scene.add(windowGroup);

        // 6. PURE 3D VANITY & LED MIRROR (Mueble y Espejo 3D)
        const vanityGroup = new THREE.Group();
        const counter = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 0.52), new THREE.MeshStandardMaterial({ color: 0x0B131F, roughness: 0.2 }));
        counter.position.set(0, 0.72, 0);
        counter.castShadow = true;
        vanityGroup.add(counter);

        const sink = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.14, 24), ceramicMat);
        sink.position.set(0, 0.85, 0);
        sink.castShadow = true;
        vanityGroup.add(sink);

        const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.95, 0.03), new THREE.MeshStandardMaterial({ color: 0xE2EEFF, metalness: 0.95, roughness: 0.05 }));
        mirror.position.set(0, 1.6, -0.22);
        vanityGroup.add(mirror);

        vanityGroup.position.set(-1.65, 0, -0.85);
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

                activeKey = btn.getAttribute('data-mat');
                const sel = materialsData[activeKey];

                if (sel) {
                    floorMat.map = sel.texture;
                    floorMat.roughness = sel.roughness;
                    floorMat.metalness = sel.metalness;
                    floorMat.needsUpdate = true;

                    if (matTitle) matTitle.innerText = sel.title;
                    if (matDesc) matDesc.innerText = sel.desc;

                    if (quoteMaterialBtn) {
                        const msg = encodeURIComponent(`Hola Jackson Construction, vi el Modelo 3D en la web y me interesa cotizar una remodelación con ${sel.title}.`);
                        quoteMaterialBtn.href = `https://wa.me/17875130607?text=${msg}`;
                    }
                }
            });
        });

        // 60FPS Render Loop
        function animate() {
            requestAnimationFrame(animate);
            if (controls) controls.update();
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

    // Initialize Pure 3D Studio Engine
    initPure3DStudioEngine();
    window.addEventListener('load', initPure3DStudioEngine);
});
