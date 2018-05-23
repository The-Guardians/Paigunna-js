document.getElementById('popuplogin').style.display = 'block';
document.getElementById('signout').style.display = 'none';
document.getElementById('signout1').style.display = 'none';
document.getElementById('name').style.display = 'none';
document.getElementById('tel').style.display = 'none';
document.getElementById('email').style.display = 'none';
document.getElementById('callService').disabled = true;
document.getElementById('price').style.display = 'none';
document.getElementById('itemPay').style.display = 'none';
document.getElementById('omise').style.display = 'none';
document.getElementById('select').disabled = true;

document.getElementById('1').style.display = 'none';
document.getElementById('2').style.display = 'none';
document.getElementById('3').style.display = 'none';
document.getElementById('4').style.display = 'none';

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

// increase and decrease number noti
var n = 0;

function inceaseNumber(){
    n = n + 1;
    document.getElementById('number').innerHTML = n;
    zeroNumber();
}
function notibox(){
    if(document.getElementById('number').innerHTML == 0){
        document.getElementById('notiminibox').style.display = 'none';
        
    }
    else{
        document.getElementById('notiminibox').style.display = 'block';
        }
}

function decreaseNumber(){ 
    if (n >= 1) 
        n = n - 1;
        document.getElementById('number').innerHTML = n;
        zeroNumber();
}

// function genBlocknoti() {
//     var btn = document.createElement("div1");
//     document.body.appendChild(btn);
// }