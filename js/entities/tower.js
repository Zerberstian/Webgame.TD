console.log("Tower class loaded");

class Tower {
    constructor(type, range, position) {
        this.type = type; // Turmtyp (z.B. "basic", "sniper", "cannon")
        this.range = range;   // Angriffsreichweite  
        this.damage = this.getDamageByType(type); // Schaden basierend auf dem Turmtyp
        this.fireRate = this.getFireRateByType(type); // Feuerrate basierend auf dem Turmtyp
        this.lastShotTime = 0; // Zeit des letzten Schusses
    }
}