Wichtiger Tipp

Da du aktuell onclick="showScreen(...)" benutzt:

```html
<button onclick="showScreen('game-screen')">
```

muss showScreen() global verfügbar sein.

Falls es irgendwann nicht mehr funktioniert:

In screens.js:
```javascript
window.showScreen = function(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    document.getElementById(id).classList.remove("hidden");
};
```
Dann funktioniert es immer sicher mit HTML onclick.