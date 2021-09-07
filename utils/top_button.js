let btn_top = document.getElementById("btn_top");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        btn_top.style.display = "block";
    } else {
        btn_top.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}