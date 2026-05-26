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
