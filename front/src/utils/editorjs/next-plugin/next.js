/* eslint-disable class-methods-use-this */
import { stopRepeating } from '@sb-ui/utils/editorjs/utils';

import PluginBase from '../PluginBase';

import { ToolboxIcon } from './resources';

import './next.css';

export default class Next extends PluginBase {
  constructor({ api, readOnly }) {
    super({
      title: api.i18n.t('title'),
    });

    this.api = api;
    this.readOnly = readOnly;
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      title: 'Next',
      icon: ToolboxIcon,
    };
  }

  get CSS() {
    return {
      baseClass: 'next-tool__base',
      input: 'next-tool__input',
    };
  }

  handleKeyDown(event) {
    if (event.key === 'Backspace' && !stopRepeating(event)) {
      this.api.blocks.delete();
    }
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.appendChild(this.titleWrapper);

    wrapper.classList.add('next-tool__wrapper');
    const button = document.createElement('button');
    button.classList.add(this.CSS.baseClass);
    button.innerText = this.api.i18n.t('button');
    const input = document.createElement('input');
    input.classList.add(this.CSS.input);
    input.addEventListener('keydown', this.handleKeyDown.bind(this));
    wrapper.appendChild(input);

    wrapper.appendChild(button);
    return wrapper;
  }

  save() {
    return {};
  }
}
