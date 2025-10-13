export default class ColumnChart {
  element;
  data;
  chartHeight = 50;

  constructor(props = {}) {
    const {
      data = {},
      label = '',
      value = 0,
      link = '',
      formatHeading = (value) => value
    } = props;
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.element = this.createElement();
  }

  createElement() {
    const newElement = document.createElement('div');
    newElement.innerHTML = this.createTemplate();

    return newElement.firstElementChild;
  }

  createTemplate() {
    return `<div class="column-chart  ${this.getChartClass()}" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.getLinkTemplate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
        ${this.getChartsTemplate()}
        </div>
      </div>
    </div>`;
  }

  getLinkTemplate() {
    return this.link ? `<a href="/sales" class="column-chart__link">View all</a>` : ``;
  }

  getChartsTemplate() {
    let template = '';
    if (this.data.length) {
      template = this.getColumnProps(this.data).map(({value, percent}) => (
        `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )).join('');
    }
    return template;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  update(newData) {
    this.data = newData;

    this.element.innerHTML = this.createTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();

  }

  getChartClass() {
    let cssClass = '';
    if (!this.data.length) {
      cssClass = 'column-chart_loading';
    }

    return cssClass;
  }
}
