// Možné kombinácie, ktoré vedú k výhre podľa pravidiel hry
const winningCombinations = [
    [0, 1, 2, 0, 1], // Prvý symbol sa opakuje na začiatku
    [1, 2, 3, 2, 1], // Všetky symboly postupujú
    [3, 2, 1, 0, 3], // Posledný symbol sa opakuje na konci
];

// Percentuálna pravdepodobnosť výhry pre každú kombináciu
const winPercentages = [
    10, // 10% šanca na výhru pre prvú kombináciu
    5,  // 5% šanca na výhru pre druhú kombináciu
    3,  // 3% šanca na výhru pre tretiu kombináciu
];
// Počítadlo otočení
let spinCount = 0;
// Funkcia na získanie náhodného čísla od 0 do max (vrátane)
function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

// Funkcia na generovanie náhodnej kombinácie výhry
function generateRandomWinningCombination() {
    const combination = [];
    for (let i = 0; i < 5; i++) {
        combination.push(getRandomNumber(3)); // 3 je počet symbolov - 1
    }
    return combination;
}

// Textový objekt pre zobrazenie výherného alebo preherného stavu
let winText = new PIXI.Text('', style);
winText.zIndex = 9999; // Pridanie z-indexu pre objekt winText
winText.x = Math.round((app.screen.width - winText.width) / 2);
winText.y = app.screen.height - winText.height - 10; // Presunutie textu na spodnú časť canvasu
app.stage.addChild(winText);

// Nový objekt pre čierne pozadie pri prehre
const lostBackground = new PIXI.Graphics();
lostBackground.beginFill(0x000000); // Čierna farba
lostBackground.drawRect(0, 0, app.screen.width, app.screen.height);
lostBackground.alpha = 0; // Neviditeľné na začiatku
app.stage.addChild(lostBackground);

// Funkcia na kontrolu výhernej kombinácie po každom zatočení
function checkWinningCombination() {
    // Zvýšenie počítadla otočení
    spinCount++;

    // Zobraziť výhru iba každé piate otočenie
    if (spinCount % 5 === 0) {
        console.log('Výherná kombinácia tentokrát: ', winningCombinations[spinCount % winningCombinations.length]);
        return;
    }

    // Získanie náhodného čísla od 0 do 99
    const randomChance = getRandomNumber(99);

    // Výber kombinácie podľa percentuálnej pravdepodobnosti
    let selectedCombination = null;
    let accumulatedPercentage = 0;

    for (let i = 0; i < winPercentages.length; i++) {
        accumulatedPercentage += winPercentages[i];
        if (randomChance < accumulatedPercentage) {
            selectedCombination = winningCombinations[i];
            break;
        }
    }

    console.log('Aktuálna kombinácia: ', selectedCombination);

    // Spracovanie výsledku výhry alebo prehry
    if (selectedCombination) {
        const newText = "Vyhrali ste!";
        console.log(newText);
    } else {
        console.log('Nevyhrali ste tentokrát.');
    }
}