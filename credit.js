let playerCredit = 1000; // Predchádzajúca hodnota kreditu
let deposit = 1; // Predchádzajúca hodnota vkladu
const maxDeposit = 5; // Maximálny depozit 5 eur

const playerCreditSpan = document.getElementById('player-credit');
const depositAmountSpan = document.getElementById('deposit-amount');
const increaseButton = document.getElementById('increase-button'); // ID tlačidla pre zvýšenie
const decreaseButton = document.getElementById('decrease-button'); // ID tlačidla pre zníženie
const spinButton = document.getElementById('spinButton'); // ID tlačidla pre spin
const maxBetButton = document.getElementById('maxBetButton'); // ID tlačidla pre maxBet

// Funkcia na zvýšenie kreditu hráča
function increaseCredit() {
    if (deposit < maxDeposit) {
        changePlayerCredit(1);
    } else {
        increaseButton.disabled = true;
    }
    decreaseButton.disabled = false; // Aktivujeme zníženie, pre prípad, že bolo deaktivované
    maxBetButton.disabled = false; // Aktivujeme tlačidlo "maxBet"
}

// Funkcia na znizenie kreditu hráča
function decreaseCredit() {
    if (deposit > 1) {
        changePlayerCredit(-1);
    } else {
        decreaseButton.disabled = true;
    }
    increaseButton.disabled = false; // Aktivujeme zvýšenie, pre prípad, že bolo deaktivované
    maxBetButton.disabled = false; // Aktivujeme tlačidlo "maxBet"
}

// Funkcia pre nastavenie maximálneho vkladu
function setMaxBet() {
    deposit = maxDeposit;
    depositAmountSpan.textContent = deposit;
}

// Funkcia na zmenu kreditu hráča
function changePlayerCredit(amount) {
    deposit += amount;

    // Kontrola maximálneho depozitu
    if (deposit >= maxDeposit) {
        deposit = maxDeposit;
        increaseButton.disabled = true;
    }

    // Kontrola záporného depozitu
    if (deposit <= 1) {
        deposit = 1;
        decreaseButton.disabled = true;
    }

    // Aktualizácia hodnoty v spane
    depositAmountSpan.textContent = deposit;
}

// Funkcia na  maximalne zvýšenie vkladu hráča
function setMaxBet() {
    deposit = maxDeposit;
    depositAmountSpan.textContent = deposit;
}

maxBetButton.addEventListener('click', () => {
    setMaxBet();
});