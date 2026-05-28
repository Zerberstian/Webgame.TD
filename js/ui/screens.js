// Zeigt den angeforderten Screen an und versteckt alle anderen
function showScreen(id) {
    // Alle Screens ausblenden
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    // Nur den gewählten Screen anzeigen
    document.getElementById(id).classList.remove("hidden");

    // Canvas nur während des Spiels anzeigen, sonst verstecken
    const canvasWrapper = document.getElementById('canvas');
    if (canvasWrapper) {
        canvasWrapper.style.display = id === 'game-screen' ? 'block' : 'none';
    }

    // Benachrichtige andere Module (z.B. main.js) über Screen-Wechsel
    if (typeof window.onScreenChange === 'function') {
        window.onScreenChange(id);
    }
}

// Warte auf DOM-Laden, dann registriere alle Button-Listener
document.addEventListener("DOMContentLoaded", () => {
    // Sammle alle Button-Elemente
    const newGameButton = document.getElementById("new-game");
    const loadGameButton = document.getElementById("load-game");
    const skillTreeButton = document.getElementById("skill-tree-button");
    const backToMenuButton = document.getElementById("back-to-menu");
    const backToMenuButton2 = document.getElementById("back-to-menu-gs");
    const backToMenuButton3 = document.getElementById("back-to-menu-st");
    const waveButton = document.getElementById("wave");

    // Verbinde Buttons mit showScreen()
    newGameButton.addEventListener("click", () => showScreen("game-menu"));
    loadGameButton.addEventListener("click", () => alert("Load Game - Funktion noch nicht implementiert"));
    skillTreeButton.addEventListener("click", () => showScreen("skill-tree-screen"));
    backToMenuButton.addEventListener("click", () => showScreen("main-menu"));
    backToMenuButton2.addEventListener("click", () => showScreen("main-menu"));
    backToMenuButton3.addEventListener("click", () => showScreen("main-menu"));
    waveButton.addEventListener("click", () => showScreen("game-screen"));

    // Starte mit Hauptmenü
    showScreen("main-menu");
});