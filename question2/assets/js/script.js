function replaceAll(from, to) {
  const fromLis = document.querySelectorAll(`.side-${from} li`);
  const toUl = document.querySelector(`.side-${to}`);
  for(let fromLi of fromLis){
    toUl.append(fromLi);
  }

  const fromAll = document.querySelector(`.${to}-to-all`);
  const fromChecked = document.querySelector(`.${to}-to-checked`);
  const toAll = document.querySelector(`.${from}-to-all`);
  const toChecked = document.querySelector(`.${from}-to-checked`);

  if (fromLis.length === 0) {
    fromAll.disabled = false;
    fromChecked.disabled = false;
    toAll.disabled = true;
    toChecked.disabled = true;
  } else {
    toAll.disabled = false;
    toChecked.disabled = false;
    fromAll.disabled = true;
    fromChecked.disabled = true;
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
