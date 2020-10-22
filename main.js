const step = 15;
const snakeSpeed = 200;
onkeyup = (event) => {
    (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );

    if (event.keyCode == 37) {
        setInterval(function action() { move('left') }, snakeSpeed);
    }
    if (event.keyCode == 38) {
        setInterval(function action() { move('up') }, snakeSpeed);
    }
    if (event.keyCode == 39) {
        setInterval(function action() { move('right') }, snakeSpeed);
    }
    if (event.keyCode == 40) {
        setInterval(function action() { move('down') }, snakeSpeed);

    }
}

function mobileControl(key) {
    (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );

    if (key == 'left') {
        setInterval(function action() { move('left') }, snakeSpeed);
    }
    if (key == 'up') {
        setInterval(function action() { move('up') }, snakeSpeed);
    }
    if (key == 'right') {
        setInterval(function action() { move('right') }, snakeSpeed);
    }
    if (key == 'down') {
        setInterval(function action() { move('down') }, snakeSpeed);
    }
}

function move(where) {
    const wayTo = document.querySelector('.snake').style;
    const wayToPoint = document.querySelector('.randomPoint').style;
    if (wayTo.marginLeft == wayToPoint.marginLeft && wayTo.marginTop == wayToPoint.marginTop) {


        let currentScore = document.querySelector('.points').textContent;
        currentScore = Number(currentScore) + 1;
        document.querySelector('.points').innerHTML = currentScore;
        genRandomPoint();
    }



    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    if (where == 'left') {
        let marginLeft = Number(wayTo.marginLeft.replace('px', ''));
        if (marginLeft < 0) { marginLeft = windowWidth - step - 2; }
        wayTo.marginLeft = `${marginLeft-step}px`;
    }

    if (where == 'up') {
        let marginTop = Number(wayTo.marginTop.replace('px', ''));
        if (marginTop < 0) { marginTop = windowHeight - step - 2; }
        wayTo.marginTop = `${marginTop-step}px`;
    }

    if (where == 'right') {
        let marginLeft = Number(wayTo.marginLeft.replace('px', ''));
        if (marginLeft > windowWidth - step * 3) { marginLeft = -step * 2; }
        wayTo.marginLeft = `${marginLeft+step}px`;
    }

    if (where == 'down') {
        let marginTop = Number(wayTo.marginTop.replace('px', ''));
        if (marginTop > windowHeight - step * 3) { marginTop = -step * 2; }
        wayTo.marginTop = `${marginTop+step}px`;
    }

}

function genRandomPoint() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let randomHeight = Math.floor(Math.random() * (windowHeight - 100));
    let randomWidth = Math.floor(Math.random() * (windowWidth - 100));
    if (randomHeight < 100) { randomHeight *= 2; }
    if (randomWidth < 100) { randomWidth *= 2; }
    // test mode
    // let randomHeight = Math.floor(Math.random() * (20));
    // let randomWidth = Math.floor(Math.random() * (20));
    while (randomHeight % step !== 0) { randomHeight++; }
    while (randomWidth % step !== 0) { randomWidth++; }
    const wayTo = document.querySelector('.randomPoint').style;
    wayTo.marginTop = `${randomHeight}px`;
    wayTo.marginLeft = `${randomWidth}px`;
}
genRandomPoint();

if (window.innerWidth < 500) {
    console.log('mazas');
}