let bgX = 0;
let bgY = 0;

bgPos = () => {
    bgX = (Math.random() * 75 + 25 + bgX) % 100;
    bgY = (Math.random() * 75 + 25 + bgY) % 100;

    document.body.style.setProperty("background-position-x", String(bgX) + "%");
    document.body.style.setProperty("background-position-y", String(bgY) + "%");
}

let bgAnim = null;

bgToggle = () => {
    if (bgAnim) {
        clearInterval(x);
    } else {
        x = setInterval(bgPos, 1000);
    }
    bgAnim = !bgAnim;
}
