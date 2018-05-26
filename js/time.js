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