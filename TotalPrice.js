class TotalPrice {
  constructor(items) {
    this.TotalPrice = 0;
    this.items = items;
    this.amounts = [];
    items.forEach((item, index) => {
      item.addSubscriber(this.updated);
      this.TotalPrice += item.data.quantity * item.data.unitPrice;

      this.amounts[index] = item.data.quantity * item.data.unitPrice;
    });

    this.element = document.querySelector("#totalPrice");
    this.element.innerHTML = `Total:  ${this.TotalPrice}`;
  }

  updated = (index, newAmount) => {
    this.TotalPrice -= this.amounts[index];
    this.amounts[index] = newAmount;
    this.TotalPrice += this.amounts[index];
    this.element.innerHTML = `Total: ${Math.abs(this.TotalPrice.toFixed(2))}`;
  };
}
