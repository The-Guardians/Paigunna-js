document.getElementById('popuplogin').style.display = 'block';
document.getElementById('accountbtn').style.display = 'none';
document.getElementById('signoutbtn').style.display = 'none';
document.getElementById('name').style.display = 'none';
document.getElementById('tel').style.display = 'none';
document.getElementById('email').style.display = 'none';
document.getElementById('price').style.display = 'none';
document.getElementById('itemPay').style.display = 'none';
document.getElementById('omise').style.display = 'none';
document.getElementById('select').disabled = true;
document.getElementById('1').style.display = 'none';
document.getElementById('2').style.display = 'none';
document.getElementById('3').style.display = 'none';
document.getElementById('4').style.display = 'none';
document.getElementById('cusNameAndLogo').style.display = 'none';
document.getElementById('call').style.display = 'none';
document.getElementById('wait').style.display = 'none';
document.getElementById('coming').style.display = 'none';
document.getElementById('logoDefault').style.display = 'block';

/*--test--*/
document.getElementById('test').style.display = 'none';
/*----*/

function login() {
    document.getElementById('popuplogin').style.display = 'none';
    document.getElementById('accountbtn').style.display = 'block';
    document.getElementById('signoutbtn').style.display = 'block';
    document.getElementById('name').style.display = 'block';
    document.getElementById('tel').style.display = 'block';
    document.getElementById('email').style.display = 'block';
    document.getElementById('logoDefault').style.display = 'none';
    document.getElementById('cusNameAndLogo').style.display = 'block';
}

function callService() {
    document.getElementById('wait').style.display = 'none';
    document.getElementById('coming').style.display = 'none';
    document.getElementById('call').style.display = 'block';
    document.getElementById('price').style.display = 'block';
    document.getElementById('select').disabled = false;
}

function wait() {
    if (document.getElementById('itemPay').style.display != 'none') {
        alert("คุณมียอดค้างชำระ กรุณาชำระเงิน");
    } else {
        time();
        document.getElementById('call').style.display = 'none';
        document.getElementById('wait').style.display = 'block';
        document.getElementById('select').disabled = true;

        /*--test--*/
        document.getElementById('test').style.display = 'block';
        /*-----*/
    }
}

function coming() {
    document.getElementById('wait').style.display = 'none';
    document.getElementById('coming').style.display = 'block';
    document.getElementById('itemPay').style.display = 'block';
    document.getElementById('service').disabled = true;
}

var wait_time = 300; //5 minute
var vela;

function time() {
    wait_time = 300;
    vela = setInterval("decrease_num()", 1000);
}
function decrease_num() {
    if (wait_time > 0) {
        var show_place = document.getElementById('show_text');
        var min = (wait_time / 60)
        var min1 = Math.floor(min);
        var sec = (wait_time % 60);
        show_place.innerHTML = "Wait(" + min1 + ":" + sec + " second)";
        wait_time--;
    } else {
        if (wait_time == 0) {
            clearTime();
            document.getElementById('wait').style.display = 'none';
            document.getElementById('call').style.display = 'block';
        }
    }
}

function clearTime(){
    clearInterval(vela);
}