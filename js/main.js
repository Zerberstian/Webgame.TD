// ===== SPIELLOGIK =====
console.log("JS LOADED");

// Flag verhindert mehrfache Initialisierung
let gameInitialized = false;

// Erstelle und positioniere alle Spielobjekte
function initGame() {
    if (gameInitialized) return; // Nur einmal ausführen

    // Beispiel-Spielobjekte: Türme, Gegner, Mauern
    //const toper1 = new Rect(100, 120, 80, 80, 'deepskyblue');


    
    // Beispiel: freie Form
    const shape1 = new FreeformShape(400, 400, 'rgb(0, 255, 0)');
    shape1.addPoint(0, 0);
    shape1.addPoint(1, -7.5);
    shape1.addPoint(50, -12.5);
    shape1.addPoint(20, 12.5);
    shape1.addPoint(2.5, 12.5);
    shape1.addPoint(27.5, -2.5); // Schließe die Form

    // Registriere Objekte bei Canvas zum Zeichnen
    //gameCanvas.add(toper1);
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