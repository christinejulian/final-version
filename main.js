// Store Cart Functionality
function addToCart(item) {
    alert(`${item} added to cart!`);
}

// 2D Fast Food Satire Game Engine
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const brands = [
    { name: 'Burger Kingpin', color: '#d62300' },
    { name: 'Star-Bucks Millions', color: '#00704a' },
    { name: 'Dunkin Inflation', color: '#ff6600' }
];

let currentBrandIndex = 0;
let money = 1000;
let price = 12.00;
let quality = 100;
let outrage = 0;
let customers = [];

class Customer {
    constructor() {
        this.x = 0;
        this.y = 350;
        this.speed = 2 + Math.random() * 2;
        this.willBuy = Math.random() * 100 > (price * 3 + outrage - quality / 2);
    }

    update() {
        this.x += this.speed;
    }

    draw() {
        ctx.fillStyle = this.willBuy ? '#00ff88' : '#ff3366';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

function adjustPrice(amount) {
    price = Math.max(1, price + amount);
    outrage = Math.min(100, Math.max(0, outrage + (amount > 0 ? 5 : -3)));
    updateUI();
}

function cutQuality() {
    quality = Math.max(10, quality - 10);
    outrage = Math.min(100, outrage + 8);
    updateUI();
}

function lobbyGovernment() {
    if (money >= 200) {
        money -= 200;
        outrage = Math.max(0, outrage - 30);
        updateUI();
    }
}

function switchBrand() {
    currentBrandIndex = (currentBrandIndex + 1) % brands.length;
    updateUI();
}

function updateUI() {
    document.getElementById('brand-name').innerText = brands[currentBrandIndex].name;
    document.getElementById('money').innerText = money.toFixed(2);
    document.getElementById('price').innerText = price.toFixed(2);
    document.getElementById('quality').innerText = quality;
    document.getElementById('outrage').innerText = Math.floor(outrage);
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Restaurant Counter
    ctx.fillStyle = brands[currentBrandIndex].color;
    ctx.fillRect(700, 250, 100, 150);
    ctx.fillStyle = '#fff';
    ctx.fillText('STORE', 725, 320);

    // Spawn Customers
    if (Math.random() < 0.03) {
        customers.push(new Customer());
    }

    // Process Customers
    for (let i = customers.length - 1; i >= 0; i--) {
        let c = customers[i];
        c.update();
        c.draw();

        // Customer reaches store
        if (c.x >= 700) {
            if (c.willBuy) {
                let margin = price - (quality * 0.05); // Lower quality = lower cost to make
                money += margin;
                updateUI();
            } else {
                outrage = Math.min(100, outrage + 0.5);
                updateUI();
            }
            customers.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

// Start simulation
gameLoop();
