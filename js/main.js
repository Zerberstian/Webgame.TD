// check for loading the script
console.log("JS LOADED");

let gameInitialized = false;

function initGame() {
    if (gameInitialized) return;

    const toper1 = new Rect(100, 120, 80, 80, 'deepskyblue');
    const toper2 = new Rect(200, 120, 80, 80, 'deepskyblue');
    const enemy = new Circle(320, 180, 40, 'orangered');
    const wall = new Rect(200, 300, 300, 30, 'darkgreen');
    const shape1 = new FreeformShape(400, 400, 'purple');
    shape1.addPoint(0, 0);
    shape1.addPoint(50, -30);
    shape1.addPoint(100, 0);
    shape1.addPoint(80, 50);
    shape1.addPoint(20, 50);

    gameCanvas.add(toper1);
    gameCanvas.add(toper2);
    gameCanvas.add(enemy);
    gameCanvas.add(wall);
    gameCanvas.add(shape1);

    gameInitialized = true;
}

window.onScreenChange = function (id) {
    if (id === 'game-screen') {
        initGame();
        gameCanvas.startLoop();
    } else {
        gameCanvas.stopLoop();
    }
};

// Wenn du später neue Objekte hinzufügen willst, kannst du sie jederzeit erstellen
// und `gameCanvas.add(neuesObjekt)` aufrufen.
// Beispiel: const bonus = new Circle(550, 100, 20, 'gold');
// gameCanvas.add(bonus);

initGame();