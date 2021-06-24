var cat = {
    locX: 40,
    locY: 200,
    speedX: 0,
    speedY: 0,
    strength: 20,
    health: 100,
    size: 25,
    color: '#52c4dc',
};

var dog = {
    locX: 550,
    locY: 200,
    speedX: 0,
    speedY: 0,
    strength: 25,
    health: 100,
    size: 25,
    color: '#ffbe00'
};

var gameOver = false;
var round = '';
var resultTxt = '';
var counterCat
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");
const newRound = document.getElementById('btn-newRound');
const result = document.getElementById('div-result');
const dogRound = document.getElementById('btn-roundDog');
const catRound = document.getElementById('btn-roundCat');
const barCat = document.getElementById("bar-cat");
const barDog = document.getElementById("bar-dog");
const gradientDog = ctx.createLinearGradient(0, 0, canvas.width, 0);
const gradientCat = ctx.createLinearGradient(0, 0, canvas.width, 0);
canvas.addEventListener("mousemove", moveDog);
window.addEventListener("keydown", moveCat);
window.addEventListener("keyup", stopCat);
const newGame = document.getElementById("btn-newGame");
newGame.addEventListener('click', function () {

    if (resultTxt == '') {
        alert('please select round cat or dog !');
        return;
    }

    cat.locX = 40;
    cat.locY = 200;
    dog.locX = 550;
    dog.locY = 200;
    cat.health = 100;
    dog.health = 100;
    gameOver = false;
    barCat.style.width = cat.health + '%';
    barDog.style.width = dog.health + '%';
    result.innerHTML = '';
    main();

});
newRound.addEventListener('click', function () {

    cat.locX = 40;
    cat.locY = 200;
    dog.locX = 550;
    dog.locY = 200;
    result.innerHTML = '';
    gameOver = false;
    main();

});

dogRound.addEventListener('click', function () {
    round = 'dog';
    resultTxt = '<p>Dog Win!</p>';
});
catRound.addEventListener('click', function () {
    round = 'cat';
    resultTxt = '<p>Cat Win!</p>';
});


function update() {

    var newLocX = cat.locX + cat.speedX;
    var newLocY = cat.locY + cat.speedY;

    if (newLocX >= 0 && newLocX <= 600) {

        cat.locX = newLocX; // update horizontal position
    }

    if (newLocY >= 0 && newLocY <= 500) {

        cat.locY = newLocY; // update vertical position

    }
    // the distance between the cat and dog
    var distance = Math.sqrt((cat.locX - dog.locX) * (cat.locX - dog.locX) +
        (cat.locY - dog.locY) * (cat.locY - dog.locY));

    if (distance <= cat.size + dog.size) {

        if (round == 'cat') {

            dog.health = dog.health - cat.strength;
            barDog.style.width = dog.health + '%';

        } else if (round == 'dog') {

            cat.health = cat.health - dog.strength;
            barCat.style.width = cat.health + '%';

        }

        gameOver = true;

    }

};

function draw() {

    // clear canvas by painting the whole canvas white
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);

    // draw cat
    ctx.fillStyle = cat.color; // cat will be blue (hexadecima colors)
    ctx.beginPath(); // start a new path
    ctx.arc(cat.locX, cat.locY, cat.size, 0, 2 * Math.PI); // specify the arc
    ctx.fill(); // fill the area the circle encloses with blue
    ctx.font = "15px Arial";
    gradientCat.addColorStop("1.0", "#FFFFFF");
    ctx.fillStyle = gradientCat;
    ctx.fillText("Cat", cat.locX - 10, cat.locY + 5);

    // draw dog
    ctx.fillStyle = dog.color; // dog will be green (hexadecimal colors)
    ctx.beginPath(); // start a new path
    ctx.arc(dog.locX, dog.locY, dog.size, 0, 2 * Math.PI); // specify the arc
    ctx.font = "15px Arial";
    ctx.fill(); // fill the area the circle encloses with green
    gradientDog.addColorStop("1.0", "#000000");
    ctx.fillStyle = gradientDog;
    ctx.fillText("Dog", dog.locX - 10, dog.locY + 5);

};

function moveDog(event) {

    var canvasRect = canvas.getBoundingClientRect();
    dog.locX = event.clientX - canvasRect.left;
    dog.locY = event.clientY - canvasRect.top;

};

function moveCat(event) {

    if (event.key == "ArrowRight") {
        cat.speedX = 10;
    } else if (event.key == "ArrowLeft") {
        cat.speedX = -10;
    } else if (event.key == "ArrowDown") {
        cat.speedY = 10;
    } else if (event.key == "ArrowUp") {
        cat.speedY = -10;
    }
};

function stopCat(event) {
    if (event.key == "ArrowRight") {
        cat.speedX = 0;
    } else if (event.key == "ArrowLeft") {
        cat.speedX = 0;
    } else if (event.key == "ArrowDown") {
        cat.speedY = 0;
    } else if (event.key == "ArrowUp") {
        cat.speedY = 0;
    }

};

function main() {
    update();
    draw();

    // continue the game only if gameOver is false
    if (gameOver == false && resultTxt != '') {
        // call the main function again to create the loop
        window.requestAnimationFrame(main);
    } else // gameOver is true
    {
        result.innerHTML = resultTxt;
    }

};

window.requestAnimationFrame(main);