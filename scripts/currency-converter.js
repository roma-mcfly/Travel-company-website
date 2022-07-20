const select = document.querySelectorAll(".currency-select");
const btn = document.getElementById("convert-button");
const val = document.getElementById("currency-value");
const ans = document.getElementById("currency-answer");

fetch("https://api.frankfurter.app/currencies")
.then((data) => data.json())
.then((data) => {
  display_currencies(data);
});

function display_currencies(data) {
  const entries = Object.entries(data);
  for (var i = 0; i < entries.length; i++) {
    select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
  }
}

btn.addEventListener("click", () => {
  let first_currency = select[0].value;
  let second_currency = select[1].value;
  let value = val.value;

  if (first_currency != second_currency) {
    convert_currencies(first_currency, second_currency, value);
  } else {
    alert("Wybierz inną walutę!");
  }
});

function convert_currencies(first_currency, second_currency, value) {
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${value}&from=${first_currency}&to=${second_currency}`
    )
  .then((val) => val.json())
  .then((val) => {
    console.log(Object.values(val.rates)[0]);
    ans.value = Object.values(val.rates)[0];
  });
}