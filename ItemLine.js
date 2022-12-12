/**
 *
 */
class ItemLine {
  constructor(element, data, index) {
    this.index = index;
    this.subscribers = [];
    this.data = data;
    this._setElement(element);
  }

  /**
   * @param {function(index: number, amount: number)} func function that should be called when total amount changes
   */
  addSubscriber = (func) => {
    this.subscribers.push(func);
  };

  _setElement = (element) => {
    this.element = element;
    const add = element.querySelector(`#${this.data.name}Add`);
    add.addEventListener("click", this.add);
    const remove = element.querySelector(`#${this.data.name}Remove`);
    remove.addEventListener("click", this.Remove);
    this.likedElement = element.querySelector("svg");
    this.likedElement.addEventListener("click", this.liked);
    if (this.data.isLiked) {
      this.liked();
    }
    const deleteElement = element.querySelector(`#${this.data.name}delete`);
    deleteElement.addEventListener("click", this.deleteElement);
  };

  setElement = (element) => this._setElement(element);

  add = (event) => {
    this.data.quantity++;
    this.element.querySelector(`#${this.data.name}Quantity`).innerHTML =
      this.data.quantity;
    this.element.querySelector(`#${this.data.name}TotalPrice`).innerHTML = (
      this.data.quantity * this.data.unitPrice
    ).toFixed(2);
    this.subscribers.forEach((func) =>
      func(this.index, this.data.quantity * this.data.unitPrice)
    );
  };
  Remove = (event) => {
    if (this.data.quantity == 0) {
      return;
    }
    this.data.quantity--;
    this.element.querySelector(`#${this.data.name}Quantity`).innerHTML =
      this.data.quantity;
    this.element.querySelector(`#${this.data.name}TotalPrice`).innerHTML = (
      this.data.quantity * this.data.unitPrice
    ).toFixed(2);
    this.subscribers.forEach((func) =>
      func(this.index, this.data.quantity * this.data.unitPrice)
    );
  };

  liked = (event) => {
    this.data.isLiked = !this.data.isLiked;

    this.likedElement.classList.toggle("liked");
  };
  deleteElement = (event) => {
    const yes = confirm("Are you sure you want to delete this item?");
    if (!yes) return;
    this.element.remove();
    this.subscribers.forEach((func) => func(this.index, 0));
  };
}
