let backgroundX = 0;
let backgroundY = 0;

bgPos = () => {
    backgroundX += (Math.random() * 75 + 25);
    backgroundX %= 100;
    backgroundY += (Math.random() * 75 + 25);
    backgroundY %= 100;

    document.body.style.setProperty("background-position-x", String(backgroundX) + "%");
    document.body.style.setProperty("background-position-y", String(backgroundY) + "%");
}

setInterval(bgPos, 1000);
