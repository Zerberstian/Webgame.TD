// ===== SPIELLOGIK =====
console.log("JS LOADED");

// Flag verhindert mehrfache Initialisierung
let gameInitialized = false;

// Erstelle und positioniere alle Spielobjekte
function initGame() {
    if (gameInitialized) return; // Nur einmal ausführen

    // Beispiel-Spielobjekte: Türme, Gegner, Mauern
    const toper1 = new Rect(100, 120, 80, 80, 'deepskyblue');
    const toper2 = new Rect(200, 120, 80, 80, 'deepskyblue');
    const enemy = new Circle(320, 180, 40, 'orangered');
    const wall = new Rect(200, 300, 300, 30, 'darkgreen');
    
    // Beispiel: freie Form
    const shape1 = new FreeformShape(400, 400, 'purple');
    shape1.addPoint(0, 0);
    shape1.addPoint(50, -30);
    shape1.addPoint(100, 0);
    shape1.addPoint(80, 50);
    shape1.addPoint(20, 50);

    // Registriere Objekte bei Canvas zum Zeichnen
    gameCanvas.add(toper1);
    gameCanvas.add(toper2);
    gameCanvas.add(enemy);
    gameCanvas.add(wall);
    gameCanvas.add(shape1);

    gameInitialized = true;
}

// Reagiere auf Screen-Wechsel: Starte/Stoppe Spiellogik
window.onScreenChange = function (id) {
    if (id === 'game-screen') {
        // Spielstart: Initialisiere und starte Draw-Loop
        initGame();
        gameCanvas.startLoop();
    } else {
        // Spielpause: Stoppe Draw-Loop
        gameCanvas.stopLoop();
    }
};

// ===== SPÄTER: Dynamische Objekte =====
// Neue Objekte können jederzeit hinzugefügt werden:
// const bonus = new Circle(550, 100, 20, 'gold');
// gameCanvas.add(bonus);

// Initialisiere Spiel beim Laden
initGame();