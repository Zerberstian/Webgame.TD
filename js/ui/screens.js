function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");

    const canvasWrapper = document.getElementById('canvas');
    if (canvasWrapper) {
        canvasWrapper.style.display = id === 'game-screen' ? 'block' : 'none';
    }

    if (typeof window.onScreenChange === 'function') {
        window.onScreenChange(id);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const newGameButton = document.getElementById("new-game");
    const loadGameButton = document.getElementById("load-game");
    const skillTreeButton = document.getElementById("skill-tree-button");
    const backToMenuButton = document.getElementById("back-to-menu");
    const backToMenuButton2 = document.getElementById("back-to-menu-button");
    const waveButton = document.getElementById("wave");

    newGameButton.addEventListener("click", () => showScreen("game-menu"));
    loadGameButton.addEventListener("click", () => alert("Load Game - Funktion noch nicht implementiert"));
    skillTreeButton.addEventListener("click", () => showScreen("skill-tree-screen"));
    backToMenuButton.addEventListener("click", () => showScreen("main-menu"));
    backToMenuButton2.addEventListener("click", () => showScreen("main-menu"));
    waveButton.addEventListener("click", () => showScreen("game-screen"));

    showScreen("main-menu");
});