// ===== PRICE RANGE FILTER =====

const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const progress = document.querySelector(".slider .progress");

let priceGap = 50;

// format hiển thị tiền
function formatPrice(value) {
  if (value >= 1000) {
    let ty = value / 1000;
    if (ty % 1 === 0) {
      return ty + " tỷ";
    }
    return ty.toFixed(1) + " tỷ";
  }
  return value + " triệu";
}

// hiển thị giá
function updatePriceDisplay(minVal, maxVal) {
  document.getElementById("min-price").innerText = formatPrice(minVal);
  document.getElementById("max-price").innerText = formatPrice(maxVal);
}

// input số
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value);
    let maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {

      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        progress.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        progress.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }

      updatePriceDisplay(minPrice, maxPrice);
    }
  });
});

// slider
rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {

      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;

      progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";

      updatePriceDisplay(minVal, maxVal);
    }
  });
});

// khởi tạo
updatePriceDisplay(400, 2000);