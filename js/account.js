var firstName = "Wasin";
var lastName = " Singhanan";
var tel = "08-8888-8888";
var email = "example@mail.com"
var srcimg = "https://www.picz.in.th/images/2018/05/23/zDdQQq.jpg";

document.getElementById('cusName').innerHTML = firstName + lastName;
$('#fullName').val(firstName+lastName);
$('#telephone').val(tel);
$('#mail').val(email);
$('#cusLogo').attr('src', srcimg);
$('#cusLogo1').attr('src', srcimg);
