// Načítanie obrázkov pred začatím hry
app.loader
    .add('https://i.ibb.co/cgGZScR/1.png') // Pridanie obrázku do načítania
    .add('https://i.ibb.co/PzJW3b6/2.png')
    .add('https://i.ibb.co/M1BcVB1/3.png')
    .add('https://i.ibb.co/pxWghbS/4.png')
    .add('logo', 'https://i.ibb.co/bgRH7wd/Jack-and-the-mystery-monsters-logo-icon.png')
    .load(onAssetsLoaded); // Načítanie obrázkov a spustenie funkcie onAssetsLoaded po načítaní

// Funkcia, ktorá sa spustí po načítaní obrázkov
function onAssetsLoaded() {
    // Pole textúr pre každý symbol na valci
    const slotTextures = [
        PIXI.Texture.from('https://i.ibb.co/cgGZScR/1.png'), // Vytvorenie textúry pre symbol 1
        PIXI.Texture.from('https://i.ibb.co/PzJW3b6/2.png'),
        PIXI.Texture.from('https://i.ibb.co/M1BcVB1/3.png'),
        PIXI.Texture.from('https://i.ibb.co/pxWghbS/4.png'),
    ];

    // Pole pre ukladanie informácií o valcoch a symboloch
    const reels = [];
    const reelContainer = new PIXI.Container();

    // Cyklus pre vytvorenie piatich valcov
    for (let i = 0; i < 5; i++) {
        // Kontajner pre každý individuálny valček
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        // Objekt reprezentujúci jeden valček
        const reel = {
            container: rc,
            symbols: [],
            position: 0,
            previousPosition: 0,
            blur: new PIXI.filters.BlurFilter(),
            id: imageIDs[Object.keys(imageIDs)[i]],
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        // Cyklus pre vytvorenie štyroch symbolov pre každý valček
        for (let j = 0; j < 4; j++) {
            // Vytvorenie symbolu s náhodnou textúrou
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
            reel.symbols.push(symbol);
            rc.addChild(symbol);
        }

        // Pridanie vytvoreného valčeka do poľa
        reels.push(reel);
    }

    // Pridanie kontajnera s valcami na scénu
    app.stage.addChild(reelContainer);

    // Nastavenie pozície kontajnera s valcami
    const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);

    // Vytvorenie grafiky pre hornú časť a spodnú časť hry
    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, app.screen.width, margin);

    const bottom = new PIXI.Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

    // Načítanie textúry loga a vytvorenie sprite pre logo
    const logoTexture = PIXI.Texture.from('logo');
    const logoSprite = new PIXI.Sprite(logoTexture);
    logoSprite.x = Math.round((top.width - logoSprite.width) / 2);
    logoSprite.y = Math.round((margin - logoSprite.height) / 2) - 5;
    top.addChild(logoSprite);

    // Pridanie horného a spodného grafického prvku na scénu
    app.stage.addChild(top);
    app.stage.addChild(bottom);

    // Premenná na sledovanie, či sa valce práve točia
    let running = false;

    // Nastavenie event listenera pre tlačidlo na spustenie hry
    const spinButton = document.getElementById('spinButton');
    spinButton.addEventListener('click', () => {
        startPlay();
    });

    // Funkcia na spustenie hry po kliknutí na tlačidlo
    function startPlay() {
        if (running) return;
        running = true;
        app.stage.removeChild(winText);
        lostBackground.alpha = 0;

        // Odpocítať aktuálnu hodnotu deposit z playerCredit
        playerCredit -= deposit;
        // Aktualizácia hodnoty v spane pre hráčov kredit
        playerCreditSpan.textContent = playerCredit;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.position + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
        }
    }

    // Callback funkcia po dokončení točenia valcov
    function reelsComplete() {
        running = false;
        checkWinningCombination();
        app.stage.addChild(winText);
        spinButton.classList.remove('stop');
    }

    // PIXI ticker funkcia na aktualizáciu stavu hry
    app.ticker.add(() => {
        if (running) {
            spinButton.disabled = true;
            maxBetButton.disabled = true;
            autoPlayButton.disabled = true;
        } else {
            spinButton.disabled = false;
            maxBetButton.disabled = false;
            autoPlayButton.disabled = false;
        }
        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            r.blur.blurY = (r.position - r.previousPosition) * 8;
            r.previousPosition = r.position;
            for (let j = 0; j < r.symbols.length; j++) {
                const s = r.symbols[j];
                const prevy = s.y;
                s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
                if (s.y < 0 && prevy > SYMBOL_SIZE) {
                    s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
                    s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                    s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
                }
            }
        }
    });
}
