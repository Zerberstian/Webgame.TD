console.log("enemy.js loaded");

class Enemy {
    constructor(type, health, speed, position) {
        this.type = type;   // Gegnertyp (z.B. "basic", "fast", "tank")
        this.health = health; // Lebenspunkte
        this.speed = speed;   // Bewegungsgeschwindigkeit
        this.position = position; // Aktuelle Position (z.B. {x: 0, y: 0})
    }
}