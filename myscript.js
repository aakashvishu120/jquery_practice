var hole_previous = 0;
var mole_previous = 0;
var score = 0;
var gameOver = false;
var timer = 0;

$(function () {
    $('#start').click(StartGame);
    $('.gamewrap').on('click', '.mole', WackaMole);

});


//Functions

function WackaMole() {
    $(this).parent().find('img').show();
    $(this).hide();
    $(this).parent().find('img').fadeOut(1000);

    score++;
    var stringScore = score.toString();
    stringScore = stringScore.padStart(2, '0');
    $('.score').text(stringScore);
}


function StartGame() {
    $('#start').hide();
    gameOver = false;
    $('.message').html('');
    //gameboard
    MakeGameBoard();
    score = 0;
    $('.score').text('00');
    
    //start gameplay
    StartMoles();

    //timer
    setTimeout(function () {
        return EndGame();
    }, 30000);
};

function StartMoles() {

    setTimeout(function () {
        changeMole();
    }, 200);

    //Set Random Hole
    var popUp = $('.hole_' + RandomHole() + '>.mole');
    timer = Math.round(Math.random() * 1000) + 600;
    popUp.show();
    //Pop Up
    popUp.animate({
        bottom: '90px'
    }, 500);

    //Pop Down
    setTimeout(function () {
        popUp.animate({
            bottom: '20px'
        }, 300);
        if (!gameOver) {
            StartMoles();
        }
    }, timer);
}

function RandomHole() {
    var hole = 1 + (Math.floor(Math.random() * $('.hole').length));
    if (hole == hole_previous) {
        console.log("random hole = ");    
        console.log(hole);

        return RandomHole();
    }
    hole_previous = hole;
    //console.log('Random Hole: ' + hole)
    return hole;
}

function RandomMole() {
    var mole = 1 + (Math.floor(Math.random() * 9));
    if (mole == mole_previous) {
        return RandomMole();
    }
    mole_previous = mole;

    return mole;
}

function changeMole() {
    RandomMole();
    for (var i = 0; i < 9; i++) {
        $('.mole.mole_' + i).css({
            backgroundImage: 'url(./mole/'+RandomMole()+'.png)'
        })
    }
}

function MakeGameBoard() {

    var moles = 8;
    var html = '';

    for (var mole = 1; mole < moles + 1; mole++) {
        html += '<div class= "hole hole_' + mole + '"><img src="wack.png" class="wack"><div class="molehill molehill_' + mole + '" style="background-image: url(./mountain/'+mole+'.png)">';
        html += '</div><div class= "mole mole_' + mole + '"></div></div></div><!--end_hole_' + mole + '-->';
    };

    $('.gamewrap').html(html);
}

function blink_text() {
    $('.message').fadeOut(300);
    $('.message').fadeIn(300);
}
setInterval(blink_text, 2000);

function EndGame() {
    gameOver = true;
    blink_text();
    setTimeout(function () {
        $('.message').html('Game Over');
        $('#start').show();
    }, timer + 500);
}