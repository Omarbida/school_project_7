"use strict";
const itemTemplate =
  '<div class="item row" id="$$name"> \
<div class="icon col-1"><img class="logo" src="$$imageURL" /></div> \
<div class="col-2 desc">$$name</div> \
<div class="price col-2">$$unitPrice $</div> \
<div class="btn col-3"> \
  <div class="row"> \
  <div class="col-2"></div>\
    <div class="bttn_1 col-2" id="$$nameAdd">+</div> \
    <div class="quentety col-4" id="$$nameQuantity">$$quantity</div> \
    <div class="bttn_2 col-2" id="$$nameRemove">-</div> \
  </div> \
</div> \
<div id="$$nameTotalPrice" class="price col-2">$$totalPrice $</div> \
<div class="like_bttn col-1"> \
<svg class="heart" id="$$nameheart" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 230 230" style="enable-background:new 0 0 230 230;" xml:space="preserve"><path d="M213.588,120.982L115,213.445l-98.588-92.463C-6.537,96.466-5.26,57.99,19.248,35.047l2.227-2.083c24.51-22.942,62.984-21.674,85.934,2.842L115,43.709l7.592-7.903c22.949-24.516,61.424-25.784,85.936-2.842l2.227,2.083C235.26,57.99,236.537,96.466,213.588,120.982z"/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg> \
</div> \
<div class="col-1 deletediv"><img id="$$namedelete" src="images/delete.png" class="delete" alt="" /></div>\
</div>';

const container = document.querySelector(".items");

const items = [
  {
    name: "Milk",
    unitPrice: 1.13,
    quantity: 1,
    imageURL: "images/milk.png",
    isLiked: false,
  },
  {
    name: "bread",
    unitPrice: 1.02,
    quantity: 1,
    imageURL: "images/bread.png",
    isLiked: false,
  },
  {
    name: "oranges",
    unitPrice: 2.43,
    quantity: 1,
    imageURL: "images/oranges.png",
    isLiked: true,
  },
  {
    name: "bananas",
    unitPrice: 1.68,
    quantity: 1,
    imageURL: "images/bananas.png",
    isLiked: false,
  },
];

const itemIlements = [];

let innerHtml = "";

items.forEach((item) => {
  innerHtml += itemTemplate
    .replaceAll("$$name", item.name)
    .replaceAll("$$imageURL", item.imageURL)
    .replaceAll("$$unitPrice", item.unitPrice)
    .replaceAll("$$quantity", item.quantity)
    .replaceAll("$$totalPrice", item.quantity * item.unitPrice);
});

container.innerHTML += innerHtml;

items.forEach((item, index) => {
  itemIlements.push(
    new ItemLine(container.querySelector(`#${item.name}`), item, index)
  );
});

const totalPrice = new TotalPrice(itemIlements);

const updated = function updated(index, amount) {
  console.log("updated from index: " + index);
};

itemIlements.forEach((item, index) => {
  item.addSubscriber(updated);
});
