## Gedanken zum Game

### Game Loop:
```
Wellen besiegen
→ Gold verdienen
→ Upgrades kaufen
→ stärkere Wellen
→ XP bekommen
→ Skilltree leveln
→ neue Türme freischalten
→ weiter kommen
→ Prestige
→ permanent stärker werden
```
---


### Was du zuerst bauen solltest

Phase 1 — Fundament

Nur:
- 1 Tower
- 1 Gegner
- 1 Map

endlose Waves

ABER:

- Goldsystem
- Upgrades
- Scaling

Das reicht schon für ein funktionierendes Incremental Game.

___

### Dein wichtigstes System:<br>
└── Scaling

Incremental Games leben davon.

Beispiel

Gegner HP:

> HP=10 x 1.15 ^wave

Gold:

> Gold=5 x 1.1 ^wave

Tower Damage:

> Damage=BaseDamage x UpgradeMultiplier

---

### Der wichtigste Profi-Tipp:
Datengetrieben arbeiten

NICHT:
```javascript
if(level == 5)
```
SONDERN:


```javascript
const towerData = {
  cannon: {
    damage: 10,
    range: 100,
    fireRate: 1
  }
}
```
Warum?
Weil du später:

Balancing
neue Türme
neue Gegner
neue Upgrades

viel einfacher machen kannst.

---

Skilltree System

Das wird später dein größter Motivationsfaktor.

Gute Skilltree-Arten
Permanent Meta-Upgrades

Zum Beispiel:

+5% Tower Damage
+10% Gold
schnellere Schüsse
neue Türme
Beispielstruktur
```javascript
const skillTree = {
  damage1: {
    cost: 1,
    bonus: 0.05
  },

  speed1: {
    cost: 2,
    bonus: 0.10
  }
}
```
---
### Das KRASSE an Incremental TDs:

Prestige

Später kannst du einbauen:

Run resetten<br>
→ spezielle Punkte erhalten<br>
→ permanent stärker werden

Das sorgt für:

hunderte Stunden Motivation<br>
exponentielles Wachstum<br>
langfristigen Progress

---

Im Web macht man das normalerweise über:

- verschiedene div-Container
- UI-States
- oder „Scenes“

Das Konzept ist praktisch dasselbe wie Frames in Tkinter.

Die wichtigste Trennung

Du hast eigentlich:

1. Canvas

Für:

- Gameplay
- Gegner
- Tower
- Animationen

2. HTML UI

Für:

- Menüs
- Skilltree
- Buttons
- Inventar
- Upgrades
- HUD

Das ist extrem wichtig.

Warum?

Canvas ist schlecht für:

- komplexe UI
- Scrollbereiche
- Buttons
- Menüs
- Tooltips

HTML/CSS ist dafür VIEL besser.

Die typische Struktur

html:

```html
<body>

    <canvas id="gameCanvas"></canvas>

    <div id="ui">

        <div id="main-menu" class="screen">
            MAIN MENU
        </div>

        <div id="game-screen" class="screen">
            GAME UI
        </div>

        <div id="skill-tree" class="screen hidden">
            SKILL TREE
        </div>

    </div>

</body>
```

CSS:

```css
.screen {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

.hidden {
    display: none;
}
```
js (Zwischen Screens wechseln):

```javascript

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
}
```
Beispiel
```javascript
showScreen("skill-tree");
```
Jetzt wird:

- Main Menu versteckt
- Gameplay versteckt
- Skilltree angezeigt

Genau wie Frames in Tkinter.
