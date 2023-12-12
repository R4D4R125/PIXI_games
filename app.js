const app = new PIXI.Application({ width: 1190, height: 600 });
document.body.appendChild(app.view);

// Vytvorenie textúry z obrázka
const texture = PIXI.Texture.from('https://i.ibb.co/y634W7D/main-bg.jpg');

// Vytvorenie spritu s textúrou
const sprite = new PIXI.Sprite(texture);

// Nastavenie veľkosti spritu na veľkosť aplikácie
sprite.width = app.renderer.width;
sprite.height = app.renderer.height;

// Pridanie spritu do scény
app.stage.addChild(sprite);

const imageIDs = {
    eggHead: 1,
    flowerTop: 2,
    helmlok: 3,
    skully: 4,
};

const REEL_WIDTH = 225;
const SYMBOL_SIZE = 150;

const style = new PIXI.TextStyle({
    fontFamily: 'Nosifer',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'],
    stroke: '#ff0000',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
});

const reels = [];