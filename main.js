const step = 15;
const snakeSpeed = 100;
onkeyup = (event) => {

    if (event.keyCode == 37 && document.querySelector('.lastDirection').textContent !== 'right') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'left';
        setInterval(function action() { move('left') }, snakeSpeed);
    }
    if (event.keyCode == 38 && document.querySelector('.lastDirection').textContent !== 'down') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'up';
        setInterval(function action() { move('up') }, snakeSpeed);
    }
    if (event.keyCode == 39 && document.querySelector('.lastDirection').textContent !== 'left') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'right';
        setInterval(function action() { move('right') }, snakeSpeed);
    }
    if (event.keyCode == 40 && document.querySelector('.lastDirection').textContent !== 'up') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'down';
        setInterval(function action() { move('down') }, snakeSpeed);

    }
}

function mobileControl(key) {
    (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );

    if (key == 'left' && document.querySelector('.lastDirection').textContent !== 'right') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'left';
        setInterval(function action() { move('left') }, snakeSpeed);
    }
    if (key == 'up' && document.querySelector('.lastDirection').textContent !== 'down') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'up';
        setInterval(function action() { move('up') }, snakeSpeed);
    }
    if (key == 'right' && document.querySelector('.lastDirection').textContent !== 'left') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'right';
        setInterval(function action() { move('right') }, snakeSpeed);
    }
    if (key == 'down' && document.querySelector('.lastDirection').textContent !== 'up') {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        document.querySelector('.lastDirection').innerHTML = 'down';
        setInterval(function action() { move('down') }, snakeSpeed);
    }
}

function move(where) {
    const wayTo = document.querySelector('.snake').style;
    const wayToPoint = document.querySelector('.randomPoint').style;
    const tail = document.querySelectorAll('.tail');


    if (Number(wayTo.marginLeft.replace('px', '')) + 10 > Number(wayToPoint.marginLeft.replace('px', ''))) {
        if (Number(wayToPoint.marginLeft.replace('px', '')) > Number(wayTo.marginLeft.replace('px', '')) - 10) {

            if (Number(wayTo.marginTop.replace('px', '')) + 10 > Number(wayToPoint.marginTop.replace('px', ''))) {
                if (Number(wayToPoint.marginTop.replace('px', '')) > Number(wayTo.marginTop.replace('px', '')) - 10) {

                    let currentScore = document.querySelector('.points').textContent;
                    currentScore = Number(currentScore) + 1;
                    document.querySelector('.points').innerHTML = currentScore;
                    genRandomPoint();
                }
            }
        }
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
    const leftTail = wayTo.marginLeft;
    const topTail = wayTo.marginTop;

    let currentScore = document.querySelector('.points').textContent;
    currentScore = Number(currentScore);
    if (document.querySelectorAll('.tail').length - 20 > currentScore) {
        document.querySelectorAll('.tail')[0].remove();
    }

    document.body.innerHTML += `<div class="tail"
    style="margin-left:${leftTail}; margin-top:${topTail}"></div>`;

    for (let i = 0; i < tail.length; i++) {
        if (wayTo.marginLeft == tail[i].style.marginLeft && wayTo.marginTop == tail[i].style.marginTop) {
            // GAME OVER
            console.log('Game over');
            (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );

            const scoreEnd = document.querySelector('.points').textContent;
            document.querySelector('.gameOver').style.display = 'block';
            document.querySelector('.gameOver').innerHTML = `Game over.<br> Your score: ${scoreEnd}
            <br> To try again click here.`;

        }
    }
}

function genRandomPoint() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    // norm mode
    let randomHeight = Math.floor(Math.random() * (windowHeight - 100));
    let randomWidth = Math.floor(Math.random() * (windowWidth - 100));
    if (randomHeight < 100) { randomHeight *= 2; }
    if (randomWidth < 100) { randomWidth *= 2; }
    // test mode
    // let randomHeight = Math.floor(Math.random() * (50));
    // let randomWidth = Math.floor(Math.random() * (50));
    //
    while (randomHeight % step !== 0) { randomHeight++; }
    while (randomWidth % step !== 0) { randomWidth++; }
    const wayTo = document.querySelector('.randomPoint').style;
    wayTo.marginTop = `${randomHeight}px`;
    wayTo.marginLeft = `${randomWidth}px`;
}
genRandomPoint();

if (window.innerWidth < 500) {
    document.querySelector('.mobileControl').style.display = "block";
}

window.onresize = () => {
    if (window.innerWidth < 500) {
        document.querySelector('.mobileControl').style.display = "block";
    } else {
        document.querySelector('.mobileControl').style.display = "none";
    }
}

function resetGame() {
    const delObjectsLength = document.querySelectorAll('.tail').length;
    document.querySelector('.points').innerHTML = 0;
    document.querySelector('.gameOver').style.display = 'none';
    document.querySelector('.snake').style.marginLeft = '0px';
    document.querySelector('.snake').style.marginTop = '0px';

    console.log(delObjectsLength);
    while (delObjectsLength > 0) {
        document.querySelectorAll('.tail')[0].remove();
    }

}