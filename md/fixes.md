Wichtiger Tipp

Da du aktuell onclick="showScreen(...)" benutzt:

```html
<button onclick="showScreen('game-screen')">
```

muss showScreen() global verfügbar sein.

Falls es irgendwann nicht mehr funktioniert:

In screens.js:
```javascript
window.showScreen = function(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
};
```
Dann funktioniert es immer sicher mit HTML onclick.

---

Klar — hier ist die Struktur sauber als Markdown formatiert:

# Projektstruktur

```text
project/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   │
│   ├── core/
│   │   ├── canvas.js
│   │   ├── gameLoop.js
│   │   ├── renderer.js
│   │   └── input.js
│   │
│   ├── ui/
│   │   ├── screens.js
│   │   ├── hud.js
│   │   ├── menus.js
│   │   └── tooltips.js
│   │
│   ├── entities/
│   │   ├── enemy.js
│   │   ├── tower.js
│   │   ├── projectile.js
│   │   └── base.js
│   │
│   ├── systems/
│   │   ├── waveSystem.js
│   │   ├── combatSystem.js
│   │   ├── economySystem.js
│   │   └── saveSystem.js
│   │
│   ├── data/
│   │   ├── towers.js
│   │   ├── enemies.js
│   │   ├── upgrades.js
│   │   └── balancing.js
│   │
│   └── main.js
```

---

# Aufgabe von `main.js`

`main.js` ist der Einstiegspunkt.

Hier passiert nur:

* Spiel starten
* Systeme initialisieren
* Reihenfolge kontrollieren

## Beispiel

```js
console.log("Game Started");

resizeCanvas();

document.addEventListener("DOMContentLoaded", () => {
    showScreen("main-menu");
});

startGameLoop();
```

---

# `core/`

Technische Basis des Spiels.

## `core/canvas.js`

```js
window.canvas = document.getElementById("game-canvas");
window.ctx = canvas.getContext("2d");

window.resizeCanvas = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeCanvas);
```

---

## `core/gameLoop.js`

```js
function gameLoop() {
    update();
    render();

    requestAnimationFrame(gameLoop);
}

window.startGameLoop = function() {
    gameLoop();
};
```

---

## `core/renderer.js`

```js
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEnemies();
    drawTowers();
}
```

---

# `ui/`

Alles was mit HTML/UI zu tun hat.

## `ui/screens.js`

```js
window.showScreen = function(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
};
```

---

## `ui/hud.js`

```js
function updateGoldDisplay() {
    document.getElementById("gold").textContent = gold;
}
```

---

# `entities/`

Spielobjekte.

## `entities/enemy.js`

```js
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hp = 100;
    }

    update() {
        this.x += 1;
    }

    draw() {
        ctx.fillRect(this.x, this.y, 20, 20);
    }
}
```

---

# `systems/`

Spielmechaniken.

## `systems/waveSystem.js`

```js
function spawnWave() {

}
```

---

## `systems/combatSystem.js`

```js
function dealDamage(enemy, damage) {
    enemy.hp -= damage;
}
```

---

# `data/`

Nur Konfigurationsdaten.

## `data/towers.js`

```js
const TOWERS = {
    basic: {
        damage: 10,
        range: 100,
        cost: 50
    }
};
```

---

# Scripts im HTML einbinden

```html
<script src="../js/core/canvas.js"></script>
<script src="../js/ui/screens.js"></script>
<script src="../js/main.js"></script>
```

---

# Wichtig: Reihenfolge

Scripts werden von oben nach unten geladen.

Darum:

```text
core -> ui -> systems -> main
```

---

# Faustregel

| Ordner     | Inhalt           |
| ---------- | ---------------- |
| `core`     | Engine/Technik   |
| `ui`       | Menüs/HUD        |
| `entities` | Spielobjekte     |
| `systems`  | Spielmechaniken  |
| `data`     | Zahlen/Balancing |
| `main.js`  | Spielstart       |
