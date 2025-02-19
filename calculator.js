let total = 0;
let current = "0";
let lastOperator = null;

function rerender() {
  document.querySelector(".output").innerText = current;
}
function inputHandle(input) {
  if (isNaN(parseInt(input))) {
    handleSymbol(input);
  } else {
    handleNumber(input);
  }
  rerender();
}
function handleNumber(value) {
  if (current === "0") {
    current = value;
  } else {
    current += value;
  }
}

function handleSymbol(value) {
  switch (value) {
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(value);
      break;
    case "=":
      if (lastOperator === null) {
        return;
      }
      operation(parseInt(current));
      current = total + "";
      console.log(current);
      lastOperator = null;
      total = 0;
      break;
    case "C":
      current = "0";
      total = 0;
      break;
    case "←":
      if (current.length === 1) current = "0";
      else current = current.substring(0, current.length - 1);
      break;
  }
}

function operation(intCurrent) {
  if (lastOperator === "+") {
    total += parseInt(current);
  } else if (lastOperator === "-") {
    total -= parseInt(current);
  } else if (lastOperator === "×") {
    total *= parseInt(current);
  } else {
    total /= parseInt(current);
  }
}
function handleMath(operator) {
  if (current === "0") {
    return;
  }
  if (total === 0) {
    total = parseInt(current);
  } else {
    operation(parseInt(current));
  }
  lastOperator = operator;
  current = "0";
}
function start() {
  const button = document.querySelector(".buttons");
  button.addEventListener("click", (event) => {
    inputHandle(event.target.innerText);
  });
}

start();
