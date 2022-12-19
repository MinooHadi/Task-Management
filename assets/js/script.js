function replaceAll(from, to) {
    const fromUl = document.querySelector(`.side-${from}`);
    const toUl = document.querySelector(`.side-${to}`);
    toUl.innerHTML += fromUl.innerHTML;
    fromUl.innerHTML = "";
    const leftAll = document.querySelector(".left-to-all");
    const rightAll = document.querySelector(".right-to-all");
    const leftChecked = document.querySelector(".left-to-checked");
    const rightChecked = document.querySelector(".right-to-checked");

    if(from === "left"){
        leftAll.disabled = false;
        rightAll.disabled = true;
        leftChecked.disabled = false;
        rightChecked.disabled = true;
    } else {
        rightAll.disabled = false;
        leftAll.disabled = true;
        leftChecked.disabled = true;
        rightChecked.disabled = false;
    }
}

