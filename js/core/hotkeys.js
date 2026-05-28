document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        showScreen('game-screen');
        // Handle key press for '1'
    } else if (event.key === '2') {
        showScreen('skill-tree-screen');
        // Handle key press for '2'
    }
});