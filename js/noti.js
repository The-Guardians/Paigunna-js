var n = 0;

function increaseNumber() {
    n = n + 1;
    document.getElementById('number').innerHTML = n;
    numnoti = n;
    zeroNumber();
    
}

function zeroNumber() {
    if (document.getElementById('number').innerHTML == 0) {
        document.getElementById('notiminibox').style.display = 'none';

    }
    else {
        document.getElementById('notiminibox').style.display = 'block';
    }
}

function decreaseNumber() {
    if (n >= 1)
        n = n - 1;
        document.getElementById('number').innerHTML = n;
        numnoti = n;
        zeroNumber();
   
}

function close1(){
    document.getElementById('1').style.display = 'none'; 
}
function close2(){
    document.getElementById('2').style.display = 'none'; 
}
function close3(){
    document.getElementById('3').style.display = 'none'; 
}
function close4(){
    document.getElementById('4').style.display = 'none'; 
}
//   ----------------------------------------------------------------
function click1(){
    document.getElementById('1').style.display = 'block';
}
function click2(){
    document.getElementById('2').style.display = 'block';
}
function click3(){
    document.getElementById('3').style.display = 'block';
}
function click4(){
    document.getElementById('4').style.display = 'block';
}

function alertPopup() {
    alert("You have "+  numnoti  +" message in notify.");
}

function addNotibox() {
    var objTo = document.getElementById('notimodule');
    var notibox = document.getElementById('1').style.display = 'block';
    var divtest = document.createElement("div");
    divtest.appendChild = notibox;
    objTo.appendChild(divtest);
}

{/* <div id="container"></div>

<input type="button" onclick="addDiv();" value="Click here to add div"/> */}
    
