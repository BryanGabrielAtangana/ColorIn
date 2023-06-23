class Color {
    constructor(hex, element) {
        this.hex = hex;
        this.element = element;
        this.locked = false;
    }

    setHex(hex) {
        this.hex = hex;
        this.element.style.backgroundColor = hex;
        this.element.querySelector('.color-input').value = hex;
    }

    setLocked(locked) {
        this.locked = locked;

        if (locked) {
            this.element
                .querySelector(".lock-toggle")
                .classList.add("is-locked");

            this.element
                .querySelector("img")
                .src = "./image/lock-closed.svg";

        } else {
            this.element
                .querySelector(".lock-toggle")
                .classList.remove("is-locked");

            this.element
                .querySelector("img")
                .src = "image/lock-open.svg";
        }
    }

    toggleLocked() {
        this.setLocked(!this.locked);
    }

    generateHex() {
        if (this.locked) {
            return;
        }

        const chars = "0123456789ABCDEF";

        let color = "#";

        for (let i = 0; i < 6; i++) {

            color += chars[Math.floor(Math.random() * 16)];
        }
        this.setHex(color);
    }

    copyToClipboard() {
        const input = this.element.querySelector('.color-input');
        input.select();
        document.execCommand('copy');
        input.blur();

        this.element.classList.add('copied');

        setTimeout(() => {
            this.element.classList.remove('copied');
        }, 1000);
    }
}

const colorElements = document.querySelectorAll('.colors .color');

const colors = [];

for (let i = 0; i < colorElements.length; i++) {

    const giveColor = colorElements[i];

    const input = giveColor.querySelector('.color-input');
    const lockToggle = giveColor.querySelector('.lock-toggle');
    const copyHex = giveColor.querySelector('.copy-hex');
    const hex = input.value;
    const color = new Color(hex, giveColor);

    input.addEventListener('input', function (event) {
        color.setHex(event.target.value);
    });
    lockToggle.addEventListener('click', () => color.toggleLocked());
    copyHex.addEventListener('click', () => color.copyToClipboard())

    color.generateHex();
    colors.push(color);
}

document.querySelector('.generator-button').addEventListener('click', () => {
    for (let i = 0; i < colors.length; i++) {
        colors[i].generateHex();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code.toLowerCase() === 'space') {
        document.querySelector(".generator-button").click();
    }
});



