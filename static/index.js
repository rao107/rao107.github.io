let bgX = 0;
let bgY = 0;
let interval = 0;

function bgPos() {
    bgX = (Math.random() * 75 + 25 + bgX) % 100;
    bgY = (Math.random() * 75 + 25 + bgY) % 100;

    document.body.style.setProperty("background-position-x", String(bgX) + "%");
    document.body.style.setProperty("background-position-y", String(bgY) + "%");
}

let bgAnim = document.cookie === "" || document.cookie.includes("bgAnim=1");

function bgStart() {
    if (bgAnim) {
        interval = setInterval(bgPos, 1000);
    } else {
        bgPos();
    }
}

function bgToggle() {
    if (bgAnim) {
        clearInterval(interval);
        document.cookie = "bgAnim=0; samesite=lax; secure";
    } else {
        interval = setInterval(bgPos, 1000);
        document.cookie = "bgAnim=1; samesite=lax; secure";
    }
    bgAnim = !bgAnim;
}
