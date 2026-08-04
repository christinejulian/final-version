// --- Satire Game Logic ---
let revenue = 0;
let outrage = 0;

const prices = {
  bk: 12,
  sb: 8,
  dk: 4
};

function raisePrice(chain, amount) {
  prices[chain] += amount;
  revenue += amount * 10; // Earn corporate profit based on price hike
  outrage += Math.floor(amount * 2.5); // Public backlash increases

  // Update DOM
  document.getElementById(`${chain}-price`).innerText = prices[chain].toFixed(2);
  updateGameStats();
}

function runCampaign() {
  if (revenue >= 50) {
    revenue -= 50;
    outrage = Math.max(0, outrage - 20);
    updateGameStats();
  } else {
    alert("Not enough revenue to run a PR campaign!");
  }
}

function updateGameStats() {
  document.getElementById('revenue').innerText = revenue;
  document.getElementById('outrage').innerText = outrage;

  if (outrage >= 100) {
    alert("Outrage reached 100%! Consumers boycotted your franchises. Game Over!");
    // Reset Game
    revenue = 0;
    outrage = 0;
    prices.bk = 12;
    prices.sb = 8;
    prices.dk = 4;
    document.getElementById('bk-price').innerText = prices.bk;
    document.getElementById('sb-price').innerText = prices.sb;
    document.getElementById('dk-price').innerText = prices.dk;
    updateGameStats();
  }
}

// --- Cart Logic ---
let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
  cart.push({ name: itemName, price: itemPrice });
  total += itemPrice;
  
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
  });
  
  cartTotal.innerText = total.toFixed(2);
}
