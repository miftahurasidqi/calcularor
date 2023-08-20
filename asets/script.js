const result = document.querySelector(".result span");
const numbers = document.querySelectorAll(".numbers");
const operator = document.querySelectorAll(".operator");
const negative = document.querySelector(".negative");
const persent = document.querySelector(".persent");
const coma = document.querySelector(".coma");
const AC = document.querySelector(".clear");
const del = document.querySelector(".del");
const equals = document.querySelector(".equals");

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let opreatorValue = "";
let display = "";

function getFristValue(val) {
  firstValue += val;
  display = firstValue;
  result.innerHTML = display;
}

function getSecondValue(val) {
  if (firstValue != "" && opreatorValue != "") {
    secondValue += val;
    display += val;
    result.innerHTML = display;
  }
}

function getOperator() {
  for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {
      opreatorValue = e.target.getAttribute("value");
      isFirstValue = true;
      display = firstValue + opreatorValue;
      result.innerHTML = display;
      fontCheck(display);
    });
  }
}

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    const numberValue = e.target.getAttribute("value");
    if (isFirstValue === false) {
      getFristValue(numberValue);
    } else if (isSecondValue === false) {
      getSecondValue(numberValue);
    }
    fontCheck(display);
  });
}

getOperator();

equals.addEventListener("click", () => {
  if ((firstValue !== "" && secondValue !== "") || firstValue.includes("%")) {
    result.innerHTML = "";
    display = display.replace("%", "/100");
    display = display.replace("x", "*");
    display = eval(display);
    display = checkNumLen(display);
    display = removeEndZero(display);
    reset(display.toString());
    result.innerHTML = display;
  }
  fontCheck(display);
});

function checkNumLen(num) {
  let result = JSON.stringify(num);
  if (result.length >= 8) {
    result = JSON.parse(result);
    result = result.toFixed(5);
  }

  return result;
}

function removeEndZero(num) {
  let desimal = num.split(".");
  let result = num;
  if (desimal.length == 2) {
    while (result.endsWith("0")) {
      result = result.slice(0, -1);
    }
  }
  return result;
}

function reset(num) {
  firstValue = num;
  isFirstValue = false;
  secondValue = "";
  opreatorValue = "";
}

negative.addEventListener("click", () => {
  if (firstValue != "" && opreatorValue === "") {
    result.innerHTML = "";
    firstValue = -firstValue;
    firstValue = firstValue.toString();
    display = firstValue;
  } else if (firstValue != "" && secondValue != "" && operator != "") {
    result.innerHTML = "";
    secondValue = -secondValue;
    secondValue = secondValue.toString();
    display = firstValue + opreatorValue + secondValue;
  }
  result.innerHTML = display;
  fontCheck(display);
});

persent.addEventListener("click", (e) => {
  const persentVal = e.target.getAttribute("value");
  result.innerHTML = "";
  if (firstValue != "" && opreatorValue === "" && !firstValue.includes("%")) {
    firstValue += persentVal;
    display = firstValue;
  } else if (firstValue != "" && secondValue != "" && operator != "" && !secondValue.includes("%")) {
    secondValue += persentVal;
    display = firstValue + opreatorValue + secondValue;
  }
  result.innerHTML = display;
  fontCheck(display);
});

AC.addEventListener("click", () => {
  resultValue = 0;
  display = "";
  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  opreatorValue = "";
  result.innerHTML = "";
  fontCheck(display);
});

coma.addEventListener("click", (e) => {
  result.innerHTML = "";
  console.log(firstValue);
  if (firstValue != "" && opreatorValue === "" && !firstValue.includes(".")) {
    firstValue += ".";
    display = firstValue;
  } else if (firstValue != "" && secondValue != "" && operator != "" && !secondValue.includes(".")) {
    secondValue += ".";
    display = firstValue + opreatorValue + secondValue;
  }
  result.innerHTML = display;
  fontCheck(display);
});

del.addEventListener("click", (e) => {
  if (secondValue != "") {
    secondValue = secondValue.slice(0, -1);
  } else if (secondValue == "" && opreatorValue != "") {
    opreatorValue = opreatorValue.slice(0, -1);
    isFirstValue = false;
  } else if (firstValue != "" && secondValue == "") {
    firstValue = firstValue.slice(0, -1);
  }
  display = firstValue + opreatorValue + secondValue;
  result.innerHTML = display;
  fontCheck(display);
});

function fontCheck(display) {
  if (display.length > 13) {
    result.classList.add("small");
  }
  if (display.length <= 13) {
    result.classList.remove("small");
  }
}
