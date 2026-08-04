// SINGLE PAGE APPLICATION ROUTING
function switchPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Remove active state from nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show target page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Highlight active button
  const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(
    btn => btn.getAttribute('onclick').includes(pageId)
  );
  if (activeBtn) activeBtn.classList.add('active');
}

// SHOPPING CART SYSTEM
let cartCount = 0;

function addToCart(itemName, itemPrice) {
  cartCount++;
  document.getElementById('cart-count').innerText = cartCount;
  alert(`Added ${itemName} ($${itemPrice.toFixed(2)}) to your cart!`);
}

// FAST FOOD INFLATION SATIRE GAME LOGIC
const gameState = {
  treasury: 25000,
  outrage: 10,
  profit: 0,
  stockPrice: 15.00,
  prices: {
    bk: 18.50,
    sb: 9.75,
    dn: 22.00
  }
};

function updateDashboard() {
  document.getElementById('treasury').innerText = Math.round(gameState.treasury).toLocaleString();
  document.getElementById('outrage').innerText = Math.min(100, Math.max(0, Math.round(gameState.outrage)));
  document.getElementById('profit').innerText = Math.round(gameState.profit).toLocaleString();
  document.getElementById('stock').innerText = gameState.stockPrice.toFixed(2);
  
  document.getElementById('bk-price').innerText = gameState.prices.bk.toFixed(2);
  document.getElementById('sb-price').innerText = gameState.prices.sb.toFixed(2);
  document.getElementById('dn-price').innerText = gameState.prices.dn.toFixed(2);
}

function logNews(message) {
  const log = document.getElementById('news-log');
  log.innerText = message;
}

// SATIRICAL ACTIONS
function adjustPrice(brand, amount) {
  gameState.prices[brand] += amount;
  gameState.outrage += 6;
  gameState.profit += 1200;
  gameState.stockPrice += 0.85;

  const excuses = [
    "Blamed 'unprecedented global avocado inflation' for price hike.",
    "Issued PR statement: 'We raised prices to improve customer experience!'",
    "Record corporate earnings reported right after doubling meal combo prices."
  ];
  const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
  logNews(`📈 [Price Increase] ${randomExcuse}`);
  updateDashboard();
}

function shrinkflation(brand) {
  gameState.outrage += 4;
  gameState.profit += 2500;
  gameState.treasury += 2000;
  
  logNews("📉 [Shrinkflation] Cut portion sizes by 20% while keeping prices identical. Customers haven't noticed... yet.");
  updateDashboard();
}

function automateStore(brand) {
  gameState.treasury -= 3000;
  gameState.profit += 3500;
  gameState.outrage += 3;
  
  logNews("🤖 [Automation] Replaced self-service staff with touchscreens that aggressively prompt for a 25% tip.");
  updateDashboard();
}

function lobbyTaxBreak(brand) {
  gameState.treasury -= 5000;
  gameState.profit += 10000;
  gameState.stockPrice += 2.50;

  logNews("🏛️ [Lobbying Victory] Successfully lobbied to reclassify high-fructose corn syrup as a 'vital superfood'.");
  updateDashboard();
}

function cutStaff(brand) {
  gameState.outrage += 8;
  gameState.profit += 1800;

  logNews("⏳ [Understaffing] Reduced store shift to 2 employees. Drive-thru line now wraps around the block!");
  updateDashboard();
}

// PASSIVE GAME TICK (Simulates corporate quarterly revenues & outrage decay)
setInterval(() => {
  gameState.treasury += gameState.profit * 0.05;
  
  // Public outrage consequences
  if (gameState.outrage > 80) {
    gameState.stockPrice = Math.max(2.00, gameState.stockPrice - 0.50);
    logNews("🚨 [Public Backlash] Boycotts trending online! Executive Board recommends releasing a heart-warming PR ad to restore image.");
  } else if (gameState.outrage > 0) {
    gameState.outrage -= 1; // Outrage naturally cools down as consumers adapt
  }

  updateDashboard();
}, 3000);

// Initialize setup
updateDashboard();
