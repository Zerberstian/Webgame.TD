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
    showScreen("main-menu");
});