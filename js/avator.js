function godDice() {
    var rand = Math.random() * 10
    rand = Math.floor(rand)
    var isEven = rand % 2 == 0
    return isEven
}

function play() {
    var avator1 = document.getElementById('avator1')
    var avator2 = document.getElementById('avator2')
    godDice() ? gone(avator1): gone(avator2);
}

function gone(ele) {
    ele.style.display = "block"
}

window.onload = function() {
    play()
}
