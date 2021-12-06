/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import { ToolboxIcon } from './resources';

import './paragraph.css';

class Paragraph {
  static get DEFAULT_PLACEHOLDER() {
    return '';
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    this._CSS = {
      block: this.api.styles.block,
      wrapper: 'ce-paragraph',
      span: 'ce-paragraph-span',
    };

    if (!this.readOnly) {
      this.onKeyUp = this.onKeyUp.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
    }

    this._placeholder = config.placeholder
      ? config.placeholder
      : Paragraph.DEFAULT_PLACEHOLDER;
    this._data = {};
    this._element = this.drawView();
    this._preserveBlank =
      config.preserveBlank !== undefined ? config.preserveBlank : false;

    this.data = data;
  }

  onKeyUp(e) {
    if (e.code !== 'Backspace' && e.code !== 'Delete') {
      return;
    }

    const { textContent } = this.spanElement;
    if (textContent === '') {
      this.spanElement.innerText = '';
    }
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      setImmediate(() => {
        this.data = { text: this.spanElement.innerHTML };
      });
    }
  }

  drawView() {
    const div = document.createElement('DIV');

    div.classList.add(this._CSS.wrapper, this._CSS.block);
    div.dataset.placeholder = this.api.i18n.t(this._placeholder);
    div.title = this.api.i18n.t('title');
    const span = document.createElement('span');
    span.classList.add(this._CSS.span);
    if (!this.readOnly) {
      span.contentEditable = true;
    }
    this.spanElement = span;
    div.appendChild(span);

    if (!this.readOnly) {
      div.addEventListener('keyup', this.onKeyUp);
      div.addEventListener('keydown', this.onKeyDown);
    }

    return div;
  }

  render() {
    return this._element;
  }

  merge(data) {
    this.data = {
      text: (this._data?.text || '') + (data?.text || ''),
    };
  }

  validate(savedData) {
    if (savedData.text.trim() === '' && !this._preserveBlank) {
      return false;
    }

    return true;
  }

  save() {
    return {
      text: this.spanElement.innerHTML,
    };
  }

  onPaste(event) {
    this.data = {
      text: event.detail.data.innerHTML,
    };
  }

  static get conversionConfig() {
    return {
      export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
      import: 'text', // to covert other block's exported string to Paragraph, fill 'text' property of tool data
    };
  }

  static get sanitize() {
    return {
      text: {
        br: true,
      },
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  get data() {
    const { text } = this; // this._element.innerHTML;

    this._data.text = text;

    return this._data;
  }

  set data(data) {
    this._data = data || {};

    this.spanElement.innerHTML = this._data.text || '';
    // this._element.innerHTML = this._data.text || '';
  }

  static get pasteConfig() {
    return {
      tags: ['P'],
    };
  }

  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Text',
    };
  }
}

export default Paragraph;
