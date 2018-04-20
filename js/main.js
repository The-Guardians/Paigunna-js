document.getElementById('popuplogin').style.display = 'block';
document.getElementById('signOut').style.display = 'none';
document.getElementById('name').style.display = 'none';
document.getElementById('tel').style.display = 'none';
document.getElementById('email').style.display = 'none';
document.getElementById('callService').disabled=true;

function login() {
    document.getElementById('popuplogin').style.display = 'none';
    document.getElementById('signOut').style.display = 'block';
    document.getElementById('name').style.display = 'block';
    document.getElementById('tel').style.display = 'block';
    document.getElementById('email').style.display = 'block';
}

function callService() {
    document.getElementById('callService').disabled=false;
}

function myFunction() {
    var x = document.getElementById("mySelect").selectedIndex;
    var y = document.getElementById("mySelect").options;
    alert("Index: " + y[x].index + " is " + y[x].text);
}
/*function logout() {
    document.getElementById('popuplogin').style.display = 'block';
    document.getElementById('signOut').style.display = 'none';
}*/