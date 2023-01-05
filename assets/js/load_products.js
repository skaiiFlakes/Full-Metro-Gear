
const productList = document.querySelector(".product-items");
const template = document.querySelector('#product-template');

const createCard = (productName, currentPrice, discount, imgFileName, buttonURL) => {
  var clone = template.content.cloneNode(true);
  var nameContainer = clone.querySelector(".name-inject");
  var imgPath = clone.querySelector(".img-inject");
  var oldPriceContainer = clone.querySelector(".old-price-inject");
  var currentPriceContainer = clone.querySelector(".new-price-inject");
  var offContainer = clone.querySelector(".discount-inject");
  var urlContainer = clone.querySelector(".url-inject")

  nameContainer.textContent = productName;
  imgPath.src = '/assets/img/'+imgFileName;
  urlContainer.href = buttonURL;
  const decimalPlaces = 0;
  if (discount === 'none' || discount == 0){
    offContainer.parentNode.style.display = 'none';
    oldPriceContainer.style.display = 'none';
    currentPriceContainer.textContent = "₱"+currentPrice.toFixed(decimalPlaces);
  } else {
    offContainer.textContent = discount*100+"% OFF";
    oldPriceContainer.textContent = "₱"+currentPrice.toFixed(decimalPlaces);
    currentPriceContainer.textContent = "₱"+(currentPrice-currentPrice*discount).toFixed(decimalPlaces);
  }

  productList.appendChild(clone);
};

fetch('/product_list.csv')
.then(response => response.text())
.then((data) => {
  const allTextLines = data.split(/\r\n|\n/);
  allTextLines.shift(); //remove header row

  allTextLines.forEach(element => {
    const elements = element.split(',');
    createCard(elements[0],parseFloat(elements[1]),parseFloat(elements[2]),elements[3],elements[4])
  });
})