console.log("Canvas management loaded");
// ===== CANVAS-VERWALTUNG =====
// Zentrale Klasse für alle Zeichnungsvorgänge und Objektverwaltung
class GameCanvas {
    constructor(canvasId = 'game-canvas') {
        // Hole Canvas-Element und Context für 2D-Zeichnen
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found.`);
        }

        this.ctx = this.canvas.getContext('2d');
        this.drawables = []; // Liste aller zu zeichnenden Objekte
        this.dpr = window.devicePixelRatio || 1; // Pixel-Ratio für scharfe Grafik
        this.isRunning = false; // Ist die Draw-Loop aktiv?

        // Bind verhindert 'this'-Fehler bei Fenster-Resize
        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    // Passe Canvas an Fenster-Größe an (wichtig bei Responsive Design)
    resize() {
        this.dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.floor(window.innerWidth * this.dpr);
        this.canvas.height = Math.floor(window.innerHeight * this.dpr);
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.drawAll();
    }

    // Lösche Canvas (bereite neues Frame vor)
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    }

    // Registriere ein Objekt zum Zeichnen
    add(drawable) {
        if (drawable && typeof drawable.draw === 'function') {
            this.drawables.push(drawable);
        }
    }

    // Entferne ein Objekt
    remove(drawable) {
        this.drawables = this.drawables.filter(item => item !== drawable);
    }

    // Zeichne alle registrierten Objekte nacheinander
    drawAll() {
        this.clear();
        for (const drawable of this.drawables) {
            drawable.draw(this.ctx);
        }
    }

    // Starte die Animations-Schleife (60 FPS via requestAnimationFrame)
    startLoop() {
        if (this.isRunning) return;
        this.isRunning = true;

        const loop = () => {
            if (!this.isRunning) return;
            this.drawAll();
            requestAnimationFrame(loop); // Nächstes Frame
        };

        requestAnimationFrame(loop);
    }

    // Stoppe die Animations-Schleife
    stopLoop() {
        this.isRunning = false;
    }
}

// ===== ZEICHENOBJEKTE =====
// Basisklasse: Alle Spielobjekte erben von hier
class Drawable {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Überschreibe diese in Unterklassen
    draw(ctx) { }
}

// Rechteck: einfaches viereckiges Objekt
class Rect extends Drawable {
    constructor(x, y, width, height, fillStyle = 'black') {
        super(x, y);
        this.width = width;
        this.height = height;
        this.fillStyle = fillStyle;
    }

    draw(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Kreis: runde Objekte (z.B. Gegner, Explosionen)
class Circle extends Drawable {
    constructor(x, y, radius, fillStyle = 'black') {
        super(x, y);
        this.radius = radius;
        this.fillStyle = fillStyle;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}

// Freie Form: benutzerdefinierte Formen aus mehreren Punkten
class FreeformShape extends Drawable {
    constructor(x, y, fillStyle = 'purple', points = []) {
        super(x, y);
        this.points = points; // Array von {x, y} Positionen
        this.fillStyle = fillStyle;
    }

    // Füge einen neuen Punkt zur Form hinzu
    addPoint(x, y) {
        this.points.push({ x, y });
    }

    // Zeichne die Form: verbinde alle Punkte miteinander
    draw(ctx) {
        if (!this.points.length) return;

        ctx.beginPath();
        ctx.moveTo(this.x + this.points[0].x, this.y + this.points[0].y);

        for (let i = 1; i < this.points.length; i++) {
            const point = this.points[i];
            ctx.lineTo(this.x + point.x, this.y + point.y);
        }

        ctx.closePath();
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
}

// ===== GLOBALE VERFÜGBARKEIT =====
// Mache alle Klassen global erreichbar (für main.js und andere Module)
window.gameCanvas = new GameCanvas();
window.GameCanvas = GameCanvas;
window.Drawable = Drawable;
window.Rect = Rect;
window.Circle = Circle;
window.FreeformShape = FreeformShape;

// Beispiel-Verwendung (auch in main.js):
// const player = new Rect(100, 100, 80, 80, 'deepskyblue');
// const enemy = new Circle(300, 200, 40, 'orangered');
// gameCanvas.add(player);
// gameCanvas.add(enemy);
// gameCanvas.startLoop();