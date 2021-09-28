import { allowedTypes } from '@sb-ui/utils/constants';

import { ToolboxIcon } from './resources';
import Uploader from './uploader';

import './index.css';

const MAX_NAME_LENGTH = 50;

function createElement({ tagName = 'div', classList = [], items = [] } = {}) {
  const element = document.createElement(tagName);
  element.classList.add(...classList);
  items.forEach((item) => {
    element.appendChild(item);
  });
  return element;
}

export default class AttachPlugin {
  constructor({ data, api, config, readOnly }) {
    this.data = data;
    this.api = api;
    this.config = config;
    this.readOnly = readOnly;

    this.nodes = {
      container: null,
      pluginTitle: null,
      fileInput: null,
      uploadButton: null,
      label: null,
    };

    this.uploader = new Uploader({
      config: this.config,
      onSuccess: this.onSuccess.bind(this),
      onError: this.onError.bind(this),
    });
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Attach',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get CSS() {
    return {
      titleWrapper: 'attach-plugin__titleWrapper',
      title: 'attach-plugin__title',
      file: 'attach-plugin__file',
      fileInput: 'attach-plugin__file-input',
    };
  }

  save() {
    return this.data;
  }

  onSuccess(response) {
    this.data = response.data;
    if (this.data.name.length > MAX_NAME_LENGTH) {
      this.nodes.label.innerText = `${this.data.name.slice(
        0,
        MAX_NAME_LENGTH,
      )}...`;
    } else {
      this.nodes.label.innerText = this.data.name;
    }
  }

  onError = () => {
    this.nodes.label.innerText = this.api.i18n.t('error');
  };

  onChange = async () => {
    await this.uploader.uploadFile(this.nodes.fileInput);
  };

  preparePluginTitle() {
    const title = createElement({
      tagName: 'span',
      classList: [this.CSS.title],
    });
    title.innerText = this.api.i18n.t('title');
    this.nodes.pluginTitle = createElement({
      classList: [this.CSS.titleWrapper],
      items: [title],
    });
    this.nodes.container.appendChild(this.nodes.pluginTitle);
  }

  prepareFileInput() {
    this.nodes.fileInput = createElement({
      tagName: 'input',
      classList: [this.CSS.file],
    });
    this.nodes.fileInput.type = 'file';
    this.nodes.fileInput.id = 'file';
    this.nodes.fileInput.accept = allowedTypes;
    this.nodes.fileInput.onchange = this.onChange;
    this.nodes.label = createElement({
      tagName: 'label',
    });
    this.nodes.label.htmlFor = 'file';
    this.nodes.label.innerText = this.data.name || this.api.i18n.t('select');
    const wrapper = createElement({
      classList: [this.CSS.fileInput],
      items: [this.nodes.fileInput, this.nodes.label],
    });
    this.nodes.container.appendChild(wrapper);
  }

  render() {
    this.nodes.container = createElement();
    this.preparePluginTitle();
    this.prepareFileInput();
    return this.nodes.container;
  }
}
