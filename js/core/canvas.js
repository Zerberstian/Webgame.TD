class GameCanvas {
    constructor(canvasId = 'game-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas element with id "${canvasId}" not found.`);
        }

        this.ctx = this.canvas.getContext('2d');
        this.drawables = [];
        this.dpr = window.devicePixelRatio || 1;
        this.isRunning = false;

        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    resize() {
        this.dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.floor(window.innerWidth * this.dpr);
        this.canvas.height = Math.floor(window.innerHeight * this.dpr);
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.drawAll();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width / this.dpr, this.canvas.height / this.dpr);
    }

    add(drawable) {
        if (drawable && typeof drawable.draw === 'function') {
            this.drawables.push(drawable);
        }
    }

    remove(drawable) {
        this.drawables = this.drawables.filter(item => item !== drawable);
    }

    drawAll() {
        this.clear();
        for (const drawable of this.drawables) {
            drawable.draw(this.ctx);
        }
    }

    startLoop() {
        if (this.isRunning) return;
        this.isRunning = true;

        const loop = () => {
            if (!this.isRunning) return;
            this.drawAll();
            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    stopLoop() {
        this.isRunning = false;
    }
}

class Drawable {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        // Überschreibe diese Methode in Unterklassen.
    }
}

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

window.gameCanvas = new GameCanvas();
window.GameCanvas = GameCanvas;
window.Drawable = Drawable;
window.Rect = Rect;
window.Circle = Circle;

// Beispiel: Objekte hinzufügen und die Zeichen-Schleife starten.
// const player = new Rect(100, 100, 80, 80, 'deepskyblue');
// const enemy = new Circle(300, 200, 40, 'orangered');
// gameCanvas.add(player);
// gameCanvas.add(enemy);
// gameCanvas.startLoop();