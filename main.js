// --- E-COMMERCE CART LOGIC ---
let cartCount = 0;

function addToCart(productName, price) {
  cartCount++;
  document.getElementById('cart-count').innerText = cartCount;
  alert(`${productName} added to cart! Total items: ${cartCount}`);
}

// --- 2D SATIRICAL FAST FOOD GAME LOGIC ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game State Variables
let gameState = {
  brand: 'Burger Queen',
  cash: 50000,
  burgerPrice: 18.99,
  outrage: 12,
  portionSize: 100, // percentage
  monthIndex: 2,
  year: 2026,
  cows: 4,
  soyFields: 3,
  customersInLine: 5
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Isometric / Top-down Rendering Simulation (McDonald's Game Style)
function drawGame() {
  // Clear Canvas (Grass Field)
  ctx.fillStyle = '#4a7c59';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Industrial Soy / Cattle Pasture Grid
  ctx.strokeStyle = '#355e41';
  ctx.lineWidth = 2;
  for (let i = 0; i < canvas.width; i += 80) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  // Draw Rainforest / Deforestation Zone
  ctx.fillStyle = '#2d4a34';
  ctx.fillRect(550, 0, 250, 400);

  // Draw Deforested Patch
  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(580, 50, 190, 150);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '12px Orbitron';
  ctx.fillText('DEFORESTED SOY ZONE', 590, 130);

  // Draw Cows (Simple 2D Sprites)
  for (let i = 0; i < gameState.cows; i++) {
    let x = 100 + (i % 4) * 90;
    let y = 100 + Math.floor(i / 4) * 70;
    
    // Cow Body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, 35, 20);
    // Black Spots
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + 5, y + 5, 8, 8);
    ctx.fillRect(x + 20, y + 2, 10, 6);
    // Label
    ctx.fillStyle = '#fff';
    ctx.font = '10px Roboto';
    ctx.fillText('Beef Unit', x, y - 5);
  }

  // Draw Fast Food Store Box
  ctx.fillStyle = '#d97706';
  ctx.fillRect(50, 260, 220, 110);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px Orbitron';
  ctx.fillText(gameState.brand, 65, 290);

  // Draw Customers Queue
  for (let i = 0; i < gameState.customersInLine; i++) {
    ctx.fillStyle = gameState.outrage > 50 ? '#ef4444' : '#3b82f6';
    ctx.beginPath();
    ctx.arc(80 + (i * 25), 340, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw HUD overlay inside canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(10, 10, 260, 50);
  ctx.fillStyle = '#34d399';
  ctx.font = '12px Orbitron';
  ctx.fillText(`Profit Margin: +$${(gameState.burgerPrice * 0.85).toFixed(2)} / meal`, 20, 30);
  ctx.fillText(`Portion Size: ${gameState.portionSize}%`, 20, 48);
}

// UI Updates
function updateUI() {
  document.getElementById('brand-name').innerText = gameState.brand;
  document.getElementById('game-cash').innerText = `$${gameState.cash.toLocaleString()}`;
  document.getElementById('game-price').innerText = `$${gameState.burgerPrice.toFixed(2)}`;
  document.getElementById('game-outrage').innerText = `${gameState.outrage}%`;
  document.getElementById('game-date').innerText = `${months[gameState.monthIndex]} ${gameState.year}`;
}

// Log Feed
function addLog(message) {
  const logBox = document.getElementById('gameLog');
  const p = document.createElement('p');
  p.innerText = `[${months[gameState.monthIndex]} ${gameState.year}]: ${message}`;
  logBox.appendChild(p);
  logBox.scrollTop = logBox.scrollHeight;
}

// Game Actions
function adjustPrice(amount) {
  gameState.burgerPrice += amount;
  if (gameState.burgerPrice < 1) gameState.burgerPrice = 1;

  if (amount > 0) {
    gameState.outrage += 8;
    gameState.customersInLine = Math.max(1, gameState.customersInLine - 1);
    addLog(`Price hiked to $${gameState.burgerPrice.toFixed(2)}. Customers complain about greedflation! Outrage up.`);
  } else {
    gameState.outrage = Math.max(0, gameState.outrage - 5);
    gameState.customersInLine = Math.min(8, gameState.customersInLine + 1);
    addLog(`Price reduced to $${gameState.burgerPrice.toFixed(2)}. Customers are slightly relieved.`);
  }
  updateUI();
  drawGame();
}

function shrinkflation() {
  if (gameState.portionSize <= 30) {
    addLog(`Portions are already micro-sized! You can't shrink them further.`);
    return;
  }
  gameState.portionSize -= 20;
  gameState.outrage += 12;
  gameState.cash += 2500; // Immediate savings
  addLog(`Shrinkflation applied! Cut meal size by 20%. Saved $2,500 in ingredient costs. Outrage spikes!`);
  updateUI();
  drawGame();
}

function buyPRCampaign() {
  if (gameState.cash < 5000) {
    addLog(`Not enough cash for a PR campaign!`);
    return;
  }
  gameState.cash -= 5000;
  gameState.outrage = Math.max(0, gameState.outrage - 25);
  addLog(`PR Smear Campaign launched! Shifted blame to "supply chain issues". Outrage reduced by 25%.`);
  updateUI();
  drawGame();
}

function switchBrand(newBrand) {
  gameState.brand = newBrand;
  addLog(`Acquired and switched focus to ${newBrand}.`);
  updateUI();
  drawGame();
}

// Game Loop Tick (Monthly Cycle)
function gameTick() {
  // Advance time
  gameState.monthIndex++;
  if (gameState.monthIndex >= 12) {
    gameState.monthIndex = 0;
    gameState.year++;
  }

  // Monthly Income Calculation based on Price vs Outrage
  let salesVolume = Math.max(10, 100 - gameState.outrage * 1.2);
  let monthlyRevenue = salesVolume * gameState.burgerPrice * 10;
  gameState.cash += Math.floor(monthlyRevenue);

  // Passive outrage increase if prices remain ridiculously high
  if (gameState.burgerPrice > 12) {
    gameState.outrage += 2;
  }

  // Cap Outrage at 100%
  if (gameState.outrage > 100) gameState.outrage = 100;

  updateUI();
  drawGame();
}

// Initial Run
drawGame();
updateUI();

// Tick every 4 seconds
setInterval(gameTick, 4000);
