let fields = [];                                                                            // Hier wird "cross" oder "circle" an der jeweiligen Stelle wo wir klicken im Array gespeichert
let gameOver = false;                                                                       // Hier wird gameOver direkt auf "false" gesetzt.
let currentShape = 'cross';                                                                 // Wir geben "currentShape" zu beginn den Wert "cross"


function fillShape(id) {
    if (!fields[id] && !gameOver) {                                                         // Wird nur ausgeführt, wenn "fields" an Stelle "[id]" NICHT gefüllt ist & wenn wir NICHT gameOver haben (Ausrufezeichen = "gegenteil")

        if (currentShape == 'cross') {                                                      // ist "currentShape" ein "cross" ?
            currentShape = 'circle'                                                         // dann ändere es danach in "circle"
            document.getElementById('player-2').classList.remove('player-active');
            document.getElementById('player-1').classList.add('player-active');
        } else {                                                                            // wenn es kein "cross ist.."
            currentShape = 'cross';                                                         // dann mach es zu einem "cross"!
            document.getElementById('player-1').classList.remove('player-active');
            document.getElementById('player-2').classList.add('player-active');
        }

        fields[id] = currentShape;
        console.log(fields);

        draw();
        checkForWin();
    }

}


function draw() {
    for (let i = 0; i < fields.length; i++) {

        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }

        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}

function checkForWin() {
    let winner;                                                                                // Die Variable wird nur gefüllt, wenn eine der IF-Abfragen true ist.

    // first row:
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1)';
    }

    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scalex(1)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scalex(1)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scalex(1)';
    }

    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scalex(1.2)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scalex(1.2)';
    }

    if (winner) {
        console.log('Du hast gewonnen!', winner);
        gameOver = true;

        setTimeout(function(){                                                                  // Die Funktion "renderGameoverScreen" wird durch "setTimeout" nach 2 Sekunden ausgeführt.
            renderGameoverScreen(winner);
        }, 1000);
    }
}

function renderGameoverScreen(winner) {
    document.getElementById('game-over-screen').classList.remove('d-none')

    document.getElementById('endscreen-dialog').innerHTML = /*html*/ `
        <p>${winner} hat gewonnen</p>
        <button onclick="restart()" class="restart-btn">Spiel neu starten</button>
    `;
}

function restart() {
    gameOver = false;
    fields = [];
    document.getElementById('game-over-screen').classList.add('d-none')

    for (let i = 1; i < 9; i++) {
        document.getElementById('line-' + i).style.transform = ('');
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById('circle-' + i).classList.add('d-none');
        document.getElementById('cross-' + i).classList.add('d-none');
    }
}