console.log(`it works!`)
// select the elements on the page
// Canvas shake buttons
const canvas = document.querySelector(`#etch-a-sketch`);
const ctx = canvas.getContext(`2d`);
const shakebutton = document.querySelector(`.shake`);
const MOVE_AMOUNT = 30;
// setup the canvas for drawing

// const width = canvas.width;
// const height = canvas.height; shortened to =>
const { width, height } = canvas;

// creating random x/y points on canvas

let x = Math.floor(Math.random() * width)
let y = Math.floor(Math.random() * height)

ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.beginPath(); 
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();
// write a draw function

function draw({ key }) {
    hue += 7;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    console.log(key);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move x,x values depending on what user did
    // x -= MOVE_AMOUNT // x = x - 10
    // y -= MOVE_AMOUNT
switch (key) {
    case `ArrowUp`:
        y -= MOVE_AMOUNT;
        break; 
    case `ArrowDown`:
        y += MOVE_AMOUNT;
        break; 
    case `ArrowLeft`:
        x -= MOVE_AMOUNT;
        break; 
    case `ArrowRight`:
        x += MOVE_AMOUNT;
        break; 
      default:
        break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// write a handler for the keys 

function handleKey(e) {
    if (e.key.includes(`Arrow`)) {
     e.preventDefault();
     draw({ key: e.key });
    }
}

// clear function

function clearCanvas() {
    canvas.classList.add(`shake`);
    ctx.clearRect(0, 0, width, height)
    canvas.addEventListener(`animationend`, function() {
        console.log(`done the shake!`)
        canvas.classList.remove(`shake`)
    }
    , 
    { once : true }
    )
}

// listen for arrow keys 
window.addEventListener(`keydown`, handleKey);
shakebutton.addEventListener(`click`, clearCanvas);