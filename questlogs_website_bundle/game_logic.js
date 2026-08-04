
// MCDONALD'S STYLE FAST-FOOD SATIRE GAME LOGIC
let gameState = {
    money: 50000,
    month: 1,
    year: 2026,
    cows: 12,
    soyFields: 4,
    pattyStock: 500,
    stores: 3,
    burgersSold: 0,
    burgerPrice: 18.99,
    wages: 12.00,
    publicApproval: 45,
    scandalLevel: 20,
    corporateTaxEvaded: 150000,
    healthInspectorBribed: False,
    isPaused: false,
    timer: null
};

function initGame() {
    updateUI();
    startGameLoop();
}

function startGameLoop() {
    if (gameState.timer) clearInterval(gameState.timer);
    gameState.timer = setInterval(gameTick, 2000);
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    document.getElementById('pause-btn').innerText = gameState.isPaused ? 'RESUME' : 'PAUSE';
}

function gameTick() {
    if (gameState.isPaused) return;

    // Advance date
    gameState.month++;
    if (gameState.month > 12) {
        gameState.month = 1;
        gameState.year++;
    }

    // Production logic
    let meatProduced = gameState.cows * 25 + gameState.soyFields * 10;
    gameState.pattyStock += meatProduced;

    // Sales logic (Higher price = lower sales per store, but high inflation pushes tolerance)
    let demand = Math.max(5, Math.floor((100 - gameState.burgerPrice * 2.5) + (gameState.publicApproval / 2)));
    let maxSales = gameState.stores * demand * 15;
    let actualSales = Math.min(gameState.pattyStock, maxSales);

    gameState.pattyStock -= actualSales;
    gameState.burgersSold += actualSales;

    // Revenue & Expenses
    let revenue = actualSales * gameState.burgerPrice;
    let upkeep = (gameState.cows * 15) + (gameState.soyFields * 10) + (gameState.stores * 800) + (gameState.wages * 50 * gameState.stores);
    
    gameState.money += (revenue - upkeep);
    
    // Natural decay / scandal passive increment
    if (gameState.burgerPrice > 15) {
        gameState.publicApproval = Math.max(0, gameState.publicApproval - 1);
    }
    if (gameState.wages < 10) {
        gameState.publicApproval = Math.max(0, gameState.publicApproval - 2);
    }

    // Check game over or win state
    if (gameState.money < -20000) {
        addLog("CRITICAL FAILURE: Corporate Bankruptcy achieved! CEO golden parachute triggered.", "danger");
        togglePause();
        alert("BANKRUPT! You ran out of bailout funds.");
    }

    updateUI();
}

function updateUI() {
    document.getElementById('game-date').innerText = getMonthName(gameState.month) + ' ' + gameState.year;
    document.getElementById('game-money').innerText = '$' + gameState.money.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('game-cows').innerText = gameState.cows;
    document.getElementById('game-soy').innerText = gameState.soyFields;
    document.getElementById('game-patties').innerText = gameState.pattyStock;
    document.getElementById('game-price').innerText = '$' + gameState.burgerPrice.toFixed(2);
    document.getElementById('game-approval').innerText = gameState.publicApproval + '%';
    document.getElementById('game-scandal').innerText = gameState.scandalLevel + '%';
    document.getElementById('game-wages').innerText = '$' + gameState.wages.toFixed(2);
    
    let approvalBar = document.getElementById('approval-bar');
    if (approvalBar) approvalBar.style.width = gameState.publicApproval + '%';
}

function getMonthName(m) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m - 1] || 'Jan';
}

function buyCows() {
    if (gameState.money >= 500) {
        gameState.money -= 500;
        gameState.cows += 2;
        addLog("Deforested 4 acres of rainforest for 2 hormone-injected cattle.", "warning");
        updateUI();
    } else {
        addLog("Insufficient funds for cattle expansion!", "danger");
    }
}

function plantSoy() {
    if (gameState.money >= 300) {
        gameState.money -= 300;
        gameState.soyFields += 1;
        addLog("Planted GMO soy field filler to stretch beef patty density.", "info");
        updateUI();
    }
}

function adjustPrice(amount) {
    gameState.burgerPrice = Math.max(2.99, gameState.burgerPrice + amount);
    if (amount > 0) {
        gameState.publicApproval = Math.max(0, gameState.publicApproval - 3);
        addLog(`Hiked McFast® Value Burger to $${gameState.burgerPrice.toFixed(2)}. Blamed global supply chain.`, "warning");
    }
    updateUI();
}

function adjustWages(amount) {
    gameState.wages = Math.max(4.25, gameState.wages + amount);
    if (amount < 0) {
        addLog(`Cut crew wages to $${gameState.wages.toFixed(2)}/hr. Automated kiosks installed.`, "danger");
    } else {
        gameState.publicApproval = Math.min(100, gameState.publicApproval + 4);
        addLog(`Raised wages slightly. PR team released 40 news articles about corporate generosity.`, "success");
    }
    updateUI();
}

function lobbyPR() {
    if (gameState.money >= 4000) {
        gameState.money -= 4000;
        gameState.publicApproval = Math.min(100, gameState.publicApproval + 15);
        gameState.scandalLevel = Math.max(0, gameState.scandalLevel - 10);
        addLog("Funded fake nutrition study claiming processed burgers reduce stress. Approval +15%.", "success");
        updateUI();
    }
}

function bribeInspector() {
    if (gameState.money >= 2500) {
        gameState.money -= 2500;
        gameState.scandalLevel = Math.max(0, gameState.scandalLevel - 20);
        addLog("Bribed health inspector. E. coli contamination report successfully shredded.", "success");
        updateUI();
    }
}

function addLog(msg, type) {
    const feed = document.getElementById('game-feed');
    if (!feed) return;
    const item = document.createElement('div');
    item.className = 'feed-item ' + (type || '');
    item.innerText = `[${getMonthName(gameState.month)} ${gameState.year}] ${msg}`;
    feed.prepend(item);
}
