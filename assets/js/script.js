function replaceAll(from, to) {
  const fromUl = document.querySelector(`.side-${from}`);
  const fromLis = fromUl.querySelectorAll("li")
  const toUl = document.querySelector(`.side-${to}`);
  for(let fromLi of fromLis){
    toUl.append(fromLi);
  }

  const leftAll = document.querySelector(".left-to-all");
  const rightAll = document.querySelector(".right-to-all");
  const leftChecked = document.querySelector(".left-to-checked");
  const rightChecked = document.querySelector(".right-to-checked");

  if (from === "left") {
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

function replaceChecked(from, to) {
  const fromUl = document.querySelector(`.side-${from}`);
  const fromInputs = fromUl.querySelectorAll("li input:checked");
  const toUl = document.querySelector(`.side-${to}`);

  if (!fromInputs.length) {
    return; 
  }

  for (let fromInput of fromInputs) {
    toUl.append(fromInput.parentElement);
  }

  const fromAll = document.querySelector(`.${to}-to-all`);
  const fromChecked = document.querySelector(`.${to}-to-checked`);
  const toAll = document.querySelector(`.${from}-to-all`);
  const toChecked = document.querySelector(`.${from}-to-checked`);

  if (fromUl.children.length == 0) {
    fromAll.disabled = true;
    fromChecked.disabled = true;
    toAll.disabled = false;
    toChecked.disabled = false;
  } else {
    fromAll.disabled = false;
    fromChecked.disabled = false;
    toAll.disabled = false;
    toChecked.disabled = false;
  }
}
