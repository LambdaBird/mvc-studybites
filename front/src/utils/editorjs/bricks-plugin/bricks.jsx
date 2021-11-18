import ReactDOM from 'react-dom';

import PluginBase from '../PluginBase';

import BricksComponent from './BricksComponent';
import { ToolboxIcon } from './resources';

import './bricks.css';

export default class Bricks extends PluginBase {
  constructor({ data, api, readOnly, block }) {
    super({
      title: api.i18n.t('title'),
    });

    this.api = api;
    this.block = block;
    this.readOnly = readOnly;
    this.data = data || {};
  }

  static get isReadOnlySupported() {
    return true;
  }

  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Bricks',
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      container: 'bricks-tool',
      inputWrapper: 'bricks-tool__input-wrapper',
      inputEnterButton: 'bricks-tool__input-enter-button',
      questionInput: 'bricks-tool__question-input',
      answerTag: 'bricks-tool__answer-tag',
      tagsWrapper: 'bricks-tool__tags-wrapper',
      answerRemove: 'bricks-tool__answer-remove',
      tooltip: 'bricks-tool__tooltip',
      tooltipText: 'bricks-tool__tooltipText',
      additionalInputWrapper: 'bricks-tool__additional-input-wrapper',
      hint: 'bricks-tool__hint',
    };
  }

  render() {
    const container = document.createElement('div');
    ReactDOM.render(<BricksComponent tool={this} />, container);
    return container;
  }

  save() {
    const { question, words: answers, allWords: words } = this;
    if (!question || !answers?.length) {
      return undefined;
    }

    return {
      question,
      answers,
      words,
    };
  }
}
