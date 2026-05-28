// Tower-Klasse: erbt von Drawable (visuelles Objekt) und wählt die Draw-Implementierung
class Tower extends Drawable {
    constructor(x, y, type = "basic", range = 80, damage = 10, specialEffect = null) {
        super(x, y);
        this.type = type;
        this.range = range;
        this.damage = damage;
        this.specialEffect = specialEffect;

        // Optional: Renderer-Objekt (z.B. FreeformShape) oder einfache Draw-Funktion
        this.renderer = null;

        // Weiche die draw-Implementierung nach Typ zur Laufzeit zu.
        // So vermeidest du große if/else-Ketten in der Haupt-Render-Schleife.
        if (this.type === 'flamer') {
            // Erstelle eine einfache freie Form als Renderer (Position relativ zum Tower)
            const flame = new FreeformShape(this.x + 15, this.y - 10, 'orangered');
            flame.addPoint(0, 0);
            flame.addPoint(20, -40);
            flame.addPoint(40, 0);
            this.renderer = flame;

            // draw delegiert an renderer (aktualisiert Position vorher)
            this.draw = function (ctx) {
                this.renderer.x = this.x + 15;
                this.renderer.y = this.y - 10;
                this.renderer.draw(ctx);
                // optional: Tower-Basis zeichnen
                ctx.fillStyle = 'sienna';
                ctx.fillRect(this.x, this.y, 30, 30);
            };
        } else if (this.type === 'sniper') {
            // Sniper hat eine einfache Darstellung mit einem langen Rohr
            this.draw = function (ctx) {
                // Basis
                ctx.fillStyle = 'darkslategray';
                ctx.fillRect(this.x, this.y, 28, 28);
                // Rohr
                ctx.strokeStyle = 'gold';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(this.x + 14, this.y + 14);
                ctx.lineTo(this.x + 14, this.y - 20);
                ctx.stroke();
            };
        } else {
            // Default: einfache Box
            this.draw = function (ctx) {
                ctx.fillStyle = 'gray';
                ctx.fillRect(this.x, this.y, 30, 30);
            };
        }
    }

    // Platz für Gameplay-Logik (z.B. Zielsuche, Cooldowns)
    update(dt) {
        // Beispiel: cooldowns, target selection, shooting usw.
    }
}
