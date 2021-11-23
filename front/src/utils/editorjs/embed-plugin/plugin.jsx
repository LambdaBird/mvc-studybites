import ReactDOM from 'react-dom';

import { sanitizeBlocks } from '@sb-ui/utils/editorjs/utils';

import EmbedComponent from './EmbedComponent';
import { ToolboxIcon } from './resources';
import { PATTERNS, SERVICES } from './services';

export default class Embed {
  constructor({ data, api, readOnly, block }) {
    this.api = api;
    this.data = data;
    this.block = block;
    this.element = null;
    this.readOnly = readOnly;
    this.elements = [];
    this.url = null;
    this.caption = null;
    this.saveData = {};
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Video',
    };
  }

  save = () => {
    if (!this.url?.value || !this.isValid) {
      return undefined;
    }

    return {
      ...this.saveData,
      inputUrl: this.url?.value,
      caption: this.caption?.innerHTML,
    };
  };

  // validate() should not be static
  // eslint-disable-next-line class-methods-use-this
  validate(savedData) {
    return !!savedData;
  }

  static get sanitize() {
    return {
      div: true,
      br: true,
      ...sanitizeBlocks,
    };
  }

  onPaste(event) {
    const { key: service, data: url } = event.detail;
    const {
      regex,
      embedUrl,
      width,
      height,
      id = (ids) => ids.shift(),
    } = SERVICES[service];
    const result = regex.exec(url).slice(1);
    const embed = embedUrl.replace(/<%= remote_id %>/g, id(result));
    this.data = {
      service,
      source: url,
      embed,
      width,
      height,
      inputUrl: url,
    };
    const oldView = this.container;

    if (oldView) {
      oldView.parentNode.replaceChild(this.render(), oldView);
    }
  }

  render() {
    const container = document.createElement('div');
    this.container = container;
    ReactDOM.render(<EmbedComponent tool={this} />, container);
    return container;
  }

  static get pasteConfig() {
    return {
      patterns: PATTERNS,
    };
  }
}
