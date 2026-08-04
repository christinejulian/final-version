
const PRODUCTS = [
    { id: 1, name: "Apex RGB Mechanical Keyboard", price: 149.99, category: "Keyboards", rating: 4.8, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", desc: "Ultra-fast optical-magnetic switches with custom per-key RGB lighting and aircraft-grade aluminum top plate." },
    { id: 2, name: "Viper Pro Ultra-Light Wireless Mouse", price: 89.99, category: "Mice", rating: 4.9, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", desc: "49g ultra-lightweight design with 30K DPI optical sensor and 90 hours of continuous battery life." },
    { id: 3, name: "Titan 34" Ultrawide Curved OLED Monitor", price: 899.99, category: "Monitors", rating: 4.9, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80", desc: "240Hz refresh rate, 0.03ms response time, Quantum Dot OLED display with immersive 1800R curvature." },
    { id: 4, name: "Acoustic Command Wireless Headset", price: 179.99, category: "Audio", rating: 4.7, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", desc: "Lossless 2.4GHz wireless connection, 50mm neodymium drivers, active noise cancellation, and retractable broadcast mic." },
    { id: 5, name: "ErgoThrone RGB Ergonomic Chair", price: 349.99, category: "Chairs", rating: 4.6, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80", desc: "Breathable mesh back support, 4D adjustable armrests, memory foam lumbar cushion, and subtle dynamic backlighting." },
    { id: 6, name: "StreamDeck Pro 15-Key Studio Controller", price: 129.99, category: "Streaming", rating: 4.8, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80", desc: "Customizable LCD keys to launch actions, trigger media, adjust audio, and control smart lighting instantly." },
    { id: 7, name: "Cardioid USB Condenser Microphone", price: 109.99, category: "Audio", rating: 4.5, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80", desc: "Studio-grade 24-bit/192kHz recording capsule with tap-to-mute sensor, gain knob, and shock mount included." },
    { id: 8, name: "RGB LED XXL Desk Mat Pad (900x400mm)", price: 34.99, category: "Accessories", rating: 4.4, img: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80", desc: "Micro-textured cloth surface optimized for all mouse sensors with 14 customizable perimeter lighting modes." },
    { id: 9, name: "CyberDeck VR Headset & Motion Controllers", price: 599.99, category: "VR Gear", rating: 4.8, img: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80", desc: "Dual 4K fast-switch LCD panels, 120Hz refresh, pancake optics, and inside-out 6DoF tracking precision." },
    { id: 10, name: "Custom Flight Simulator Joystick & Throttle", price: 249.99, category: "Controllers", rating: 4.9, img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80", desc: "Dual-throttle setup with magnetic contactless Hall Effect sensors and 31 programmable physical buttons." },
    { id: 11, name: "Overclocked Liquid Cooled PC Desktop Rig", price: 2499.99, category: "Desktops", rating: 5.0, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80", desc: "Intel i9-14900KS, RTX 4090 24GB, 64GB DDR5 RAM, custom hard-line liquid cooling loop in tempered glass chassis." },
    { id: 12, name: "Dual-Monitor Heavy-Duty Gas Spring Arm", price: 79.99, category: "Accessories", rating: 4.6, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80", desc: "Supports two 17" to 32" screens up to 19.8 lbs per arm with integrated cable management channels." },
    { id: 13, name: "Wireless Charging Gaming Mouse Pad", price: 49.99, category: "Accessories", rating: 4.3, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", desc: "15W Qi fast-wireless charging zone built right into the corner of a spill-resistant gaming surface." },
    { id: 14, name: "Force Feedback Racing Wheel & Pedals", price: 399.99, category: "Controllers", rating: 4.8, img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80", desc: "Direct drive 10Nm motor, real leather wheel rim, magnetic paddle shifters, and load-cell brake pedal assembly." },
    { id: 15, name: "Studio Monitor Desktop Speakers (Pair)", price: 199.99, category: "Audio", rating: 4.7, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80", desc: "Bi-amplified active studio monitors with Kevlar low-frequency drivers and natural silk dome tweeters." },
    { id: 16, name: "Portable Handheld Gaming Console 1TB", price: 649.99, category: "Consoles", rating: 4.8, img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80", desc: "7-inch 120Hz OLED screen, AMD Z1 Extreme APU, 16GB LPDDR5, full AAA Windows gaming PC in your hands." },
    { id: 17, name: "Capture Card 4K60 Pro Passthrough", price: 159.99, category: "Streaming", rating: 4.6, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80", desc: "Zero-lag 4K HDR10 passthrough with pristine 1080p 60fps streaming recording via USB 3.0." },
    { id: 18, name: "4K Key Light Panel Studio Accent Light", price: 89.99, category: "Streaming", rating: 4.5, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80", desc: "2800 lumens Wi-Fi app-controlled key lighting with opal glass diffusion and desk clamp mount." },
    { id: 19, name: "Mechanical Numpad Keypad (Hot-swappable)", price: 39.99, category: "Keyboards", rating: 4.4, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", desc: "Dedicated 21-key numeric pad with lubricated linear switches, gasket mount, and PBT keycaps." },
    { id: 20, name: "Ultra-Fast NVMe M.2 4TB SSD Gen4", price: 289.99, category: "Components", rating: 4.9, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80", desc: "Blazing read speeds up to 7450 MB/s with custom aluminum heatsink pre-installed for thermal control." }
];

let cart = JSON.parse(localStorage.getItem('questlogs_cart')) || [];

function saveCart() {
    localStorage.setItem('questlogs_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let count = cart.reduce((total, item) => total + item.qty, 0);
    let badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => b.innerText = count);
}

function addToCart(productId) {
    let product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    let existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
    }
    saveCart();
    alert(`Added "${product.name}" to your shopping cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function changeQty(productId, delta) {
    let item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}
