// check for loading the script
console.log("JS LOADED");

// Beispiel: Erzeuge Zeichenobjekte und starte die Zeichen-Schleife.
// Das funktioniert, weil canvas.js `window.gameCanvas` und die Klassen global verfügbar macht.

const player = new Rect(100, 120, 80, 80, 'deepskyblue');
const enemy = new Circle(320, 180, 40, 'orangered');
const wall = new Rect(200, 300, 300, 30, 'darkgreen');

gameCanvas.add(player);
gameCanvas.add(enemy);
gameCanvas.add(wall);

gameCanvas.startLoop();

// Wenn du später neue Objekte hinzufügen willst, kannst du sie jederzeit erstellen
// und `gameCanvas.add(neuesObjekt)` aufrufen.
// Beispiel: const bonus = new Circle(550, 100, 20, 'gold');
// gameCanvas.add(bonus);

