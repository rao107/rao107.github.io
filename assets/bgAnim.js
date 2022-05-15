let bgX = 0;
let bgY = 0;
let interval = 0;

/**
 * Calculate a new position for the background and change the document style
 */
function bgPos() {
    bgX = (Math.random() * 75 + 25 + bgX) % 100;
    bgY = (Math.random() * 75 + 25 + bgY) % 100;

    document.body.style.setProperty("background-position-x", String(bgX) + "%");
    document.body.style.setProperty("background-position-y", String(bgY) + "%");
}

let bgAnim = false;

if (sessionStorage.length === 0) {
    sessionStorage.setItem("bgAnim", "1");
    bgAnim = true;
} else if (sessionStorage.getItem("bgAnim") === "1") {
    bgAnim = true;
}

/**
 * First function called to set the position of the background image and set
 * the interval of updating the background image.
 */
function bgStart() {
    bgPos();
    if (bgAnim) {
        interval = setInterval(bgPos, 1000);
    }
}

/**
 * Called when button is pushed to either clear the interval or set it as well
 * as change the session storage variable appropriately.
 */
function bgToggle() {
    if (bgAnim) {
        clearInterval(interval);
        sessionStorage.setItem("bgAnim", "0");
    } else {
        bgPos();
        interval = setInterval(bgPos, 1000);
        sessionStorage.setItem("bgAnim", "1");
    }
    bgAnim = !bgAnim;
}
