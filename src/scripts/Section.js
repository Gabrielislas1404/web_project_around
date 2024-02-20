export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = "";
  }
  addItem(cardElement) {
    this._container.appendChild(cardElement);
  }

  renderer() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
