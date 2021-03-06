const step = 15;
const snakeSpeed = 100;
let where = 'up';
onkeyup = (e) => {
    let direction = '';
    let directionNew = '';

    if (e.keyCode == 37) {
        direction = 'left';
        directionNew = 'right';
    }
    if (e.keyCode == 38) {
        direction = 'up';
        directionNew = 'down';
    }
    if (e.keyCode == 39) {
        direction = 'right';
        directionNew = 'left';
    }
    if (e.keyCode == 40) {
        direction = 'down';
        directionNew = 'up';
    }
    if (direction != document.querySelector('.lastDirection').textContent) {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        setInterval(function action() { move(direction) }, snakeSpeed);
        document.querySelector('.lastDirection').innerHTML = directionNew;
    }
}

if (window.innerWidth < 700) {
    document.querySelector('.chooseControler').style.display = 'block';

}

function chooseControler(which) {
    if (which == 1) {
        document.querySelector('.mobileControl').style.display = "block"; //block
    }

    if (which == 2) {
        document.addEventListener("click", (e) => {
            console.log(e);
            const touchY = e.clientY;
            const touchX = e.clientX;

            if (window.innerHeight / 6 > touchY) {
                mobileControl('up')
            }
            if (window.innerHeight / 6 * 5 > touchY) {
                if (touchY > window.innerHeight / 6) {
                    if (window.innerWidth / 2 < touchX) {
                        mobileControl('right')
                    }
                    if (window.innerWidth / 2 > touchX) {
                        mobileControl('left')
                    }
                }
            }

            if (window.innerHeight / 6 * 5 < touchY) {
                mobileControl('down')
            }
        });
    }
    document.querySelector('.chooseControler').style.display = 'none';
}

function mobileControl(key) {
    let directionNew = '';
    if (key == 'left') {
        directionNew = 'right';
    }
    if (key == 'up') {
        directionNew = 'down';
    }
    if (key == 'right') {
        directionNew = 'left';

    }
    if (key == 'down') {
        directionNew = 'up';
    }
    if (key != document.querySelector('.lastDirection').textContent) {
        (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );
        setInterval(function action() { move(key) }, snakeSpeed);
        document.querySelector('.lastDirection').innerHTML = directionNew;
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
        if (marginLeft < 0) { marginLeft = windowWidth; }
        wayTo.marginLeft = `${marginLeft-step}px`;
    }

    if (where == 'up') {
        let marginTop = Number(wayTo.marginTop.replace('px', ''));
        if (marginTop < 0) { marginTop = windowHeight; }
        wayTo.marginTop = `${marginTop-step}px`;
    }

    if (where == 'right') {
        let marginLeft = Number(wayTo.marginLeft.replace('px', ''));
        if (marginLeft + step * 2 > windowWidth) { marginLeft = -step * 2; }
        wayTo.marginLeft = `${marginLeft+step}px`;
    }

    if (where == 'down') {
        let marginTop = Number(wayTo.marginTop.replace('px', ''));
        if (marginTop + step * 2 > windowHeight) { marginTop = -step * 2; }
        wayTo.marginTop = `${marginTop+step}px`;
    }
    const leftTail = wayTo.marginLeft;
    const topTail = wayTo.marginTop;
    let currentScore = document.querySelector('.points').textContent;
    currentScore = Number(currentScore);
    if (document.querySelectorAll('.tail').length - 2 > currentScore) {
        document.querySelectorAll('.tail')[0].remove();
    }

    document.querySelector('main').innerHTML += `<div class="tail"
    style="margin-left:${leftTail}; margin-top:${topTail}"></div>`;

    for (let i = 0; i < tail.length; i++) {
        if (wayTo.marginLeft == tail[i].style.marginLeft && wayTo.marginTop == tail[i].style.marginTop) {
            // GAME OVER
            console.log('Game over');
            (function(w) { w = w || window; var i = w.setInterval(function() {}, 100000); while (i >= 0) { w.clearInterval(i--); } })( /*window*/ );

            const scoreEnd = document.querySelector('.points').textContent;
            document.querySelector('.gameOver').style.display = 'block';
            document.querySelector('.gameOver').innerHTML = `Game over.<br> Your score: ${scoreEnd}
            <br> Click anywhere to try again.`;
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
    if (randomHeight - 100 > windowHeight) { randomHeight / 2; }
    if (randomWidth - 100 > windowWidth) { randomWidth / 2; }
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