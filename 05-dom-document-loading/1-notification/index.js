export default class NotificationMessage {
  message;
  duration;
  type;
  element = document.createElement('div');

  constructor(message, props = {}) {
    const {
      duration = 0,
      type = '',
    } = props;
    this.duration = duration;
    this.type = type;
    this.message = message;

    this.createElement();
  }

  createElement() {
    const newElement = document.createElement('div');
    newElement.innerHTML = this.createTemplate();

    this.element = newElement.firstElementChild;
  }

  createTemplate() {
    return `<div class="notification ${this.type}" style="--value:20s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">${this.message}</div>
                </div>
            </div>`;
  }

  getDurationInSeconds() {
    return this.duration / 1000;
  }

  show(element) {
    let currentElement = element || document.body;
    currentElement.append(this.element);
    this.remove();
  }

  remove() {
    setTimeout(() => this.element.remove(), this.duration);
  }

  destroy() {
    this.element.remove();
  }


}
