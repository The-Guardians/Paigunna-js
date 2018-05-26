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
    document.getElementById('call').style.display = 'block';
    document.getElementById('price').style.display = 'block';
    document.getElementById('select').disabled = false;
}

function wait() {
    document.getElementById('call').style.display = 'none';
    document.getElementById('wait').style.display = 'block';
    document.getElementById('select').disabled = true;

    /*--test--*/
    document.getElementById('test').style.display = 'block';
    /*-----*/

}

function coming() {
    document.getElementById('wait').style.display = 'none';
    document.getElementById('coming').style.display = 'block';
    document.getElementById('itemPay').style.display = 'block';
    document.getElementById('service').disabled = true;
}
