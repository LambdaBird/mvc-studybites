import ReactDOM from 'react-dom';

import { sanitizeBlocks } from '@sb-ui/utils/editorjs/utils';

import SimpleImage from './SimpleImage/SimpleImage';
import { ToolboxIcon } from './resources';

export default class Image {
  constructor({ data, api, readOnly, block }) {
    this.block = block;
    this.data = data;
    this.api = api;
    this.readOnly = readOnly;
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
      title: 'Image',
    };
  }

  save = () => {
    const location = this.linkInputRef?.current?.innerText;
    const caption = this.captionInputRef?.current?.innerHTML;

    if (location?.length > 0 && !this.error) {
      return {
        location,
        caption,
      };
    }

    return null;
  };

  static get sanitize() {
    return {
      div: true,
      br: true,
      ...sanitizeBlocks,
    };
  }

  render() {
    const container = document.createElement('div');
    ReactDOM.render(<SimpleImage tool={this} />, container);
    return container;
  }
}