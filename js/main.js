document.getElementById('popuplogin').style.display = 'block';
document.getElementById('signout').style.display = 'none';
document.getElementById('signout1').style.display = 'none';
document.getElementById('name').style.display = 'none';
document.getElementById('tel').style.display = 'none';
document.getElementById('email').style.display = 'none';
document.getElementById('callService').disabled = true;
document.getElementById('price').style.display = 'none';
document.getElementById('itemPay').style.display = 'none';
document.getElementById('hello007').style.display = 'none';

function login() {
    document.getElementById('popuplogin').style.display = 'none';
    document.getElementById('signout').style.display = 'block';
    document.getElementById('signout1').style.display = 'block';
    document.getElementById('name').style.display = 'block';
    document.getElementById('tel').style.display = 'block';
    document.getElementById('email').style.display = 'block';
}

function callService() {
    document.getElementById('callService').disabled = false;
    document.getElementById('price').style.display = 'block';
    document.getElementById('itemPay').style.display = 'block';
}

function hello() {
    document.getElementById('hello007').style.display = 'block';
}
