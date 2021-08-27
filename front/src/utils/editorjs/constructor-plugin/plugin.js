import { icon, removeIcon } from './resources';

import './constructor.css';

const MAX_ANSWER_LENGTH = 50;

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export default class Constructor {
  constructor({ data, api, readOnly }) {
    this.api = api;
    this.data = data;
    this.readOnly = readOnly;
    this.elements = {};
    this.answers = this.data.answers || [];
    this.words = this.data.words || [];
  }

  static get toolbox() {
    return {
      title: 'Constructor',
      icon,
    };
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      container: 'constructor-tool',
      questionInput: 'constructor-tool__question-input',
      answerInput: 'constructor-tool__answer-input',
      answerTag: 'constructor-tool__answer-tag',
      tagsWrapper: 'constructor-tool__tags-wrapper',
      answerRemove: 'constructor-tool__answer-remove',
      tooltip: 'constructor-tool__tooltip',
      tooltipText: 'constructor-tool__tooltipText',
      additionalInput: 'constructor-tool__additional-input',
      hint: 'constructor-tool__hint',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  renderTags() {
    const words = [...new Set([...this.answers, ...this.words])];
    const answerTags = words.map((text) => this.createTag({ text }));
    const spans = Array.from(this.elements.tagsWrapper.childNodes).filter(
      (x) => x.tagName === 'SPAN',
    );
    spans.forEach((span) => {
      span.remove();
    });
    answerTags.forEach((answerTag) => {
      this.elements.tagsWrapper.appendChild(answerTag);
      answerTag
        .querySelector(`.${this.CSS.answerRemove}`)
        .addEventListener('click', () => {
          this.removeTag({ tag: answerTag });
        });
    });
  }

  removeTag({ tag }) {
    const filteredAnswers = this.answers.filter((answer) => {
      const tagValue =
        tag.querySelector(`.${this.CSS.tooltipText}`)?.innerHTML ||
        tag?.innerText?.trim();
      return answer !== tagValue;
    });
    if (this.answers) {
      this.answers = filteredAnswers;
    }
    if (this.data.answers) {
      this.data.answers = filteredAnswers;
    }
    const filteredWords = this.words.filter((answer) => {
      const tagValue =
        tag.querySelector(`.${this.CSS.tooltipText}`)?.innerHTML ||
        tag?.innerText?.trim();
      return answer !== tagValue;
    });
    if (this.words) {
      this.words = filteredWords;
    }
    if (this.data.words) {
      this.data.words = filteredWords;
    }
    this.renderTags();
  }

  handleEnterAnswer({ event }) {
    event.preventDefault();
    const value = this.elements?.answerInput?.value;
    if (
      value &&
      !this.answers.find(
        (answer) =>
          answer?.trim()?.toLowerCase() === value.trim()?.toLowerCase(),
      )
    ) {
      this.answers.push(value.trim());
      this.words.push(value.trim());
      this.renderTags();
    }
    this.elements.answerInput.value = '';
  }

  handleEnterWord({ event }) {
    event.preventDefault();
    const value = this.elements?.additionalInput?.value;
    if (
      value &&
      !this.words.find(
        (answer) =>
          answer?.trim()?.toLowerCase() === value.trim()?.toLowerCase(),
      )
    ) {
      this.words.push(value.trim());
      this.renderTags();
    }
    this.elements.additionalInput.value = '';
  }

  createTag({ text }) {
    const wrapper = document.createElement('span');
    wrapper.classList.add(this.CSS.answerTag);

    let displayText = createElementFromHTML(`<span>${text}</span>`);
    if (text.length > MAX_ANSWER_LENGTH) {
      const textDiv = document.createElement('div');
      textDiv.innerText = text;

      displayText = document.createElement('div');
      displayText.classList.add(this.CSS.tooltip);

      const textSpan = document.createElement('span');
      textSpan.innerText = `${text.slice(0, MAX_ANSWER_LENGTH)}...`;

      const tooltipText = document.createElement('div');
      tooltipText.classList.add(this.CSS.tooltipText);
      tooltipText.innerText = text;

      displayText.appendChild(textSpan);
      displayText.appendChild(tooltipText);
    }

    const removeSpan = createElementFromHTML(removeIcon(this.CSS.answerRemove));

    wrapper.appendChild(displayText);
    wrapper.appendChild(removeSpan);

    return wrapper;
  }

  static get enableLineBreaks() {
    return true;
  }

  save() {
    const question = this.elements.questionInput.innerText;
    const { answers, words } = this;

    if (!question || !answers?.length || !words?.length) {
      return null;
    }
    return {
      question,
      answers,
      words,
    };
  }

  render() {
    const container = document.createElement('div');
    container.classList.add(this.CSS.container);

    const hint = document.createElement('span');
    hint.innerText = '* Words will be shuffled for students after save';
    hint.classList.add(this.CSS.hint);

    this.elements.questionInput = document.createElement('div');
    this.elements.questionInput.classList.add(this.CSS.input);
    this.elements.questionInput.classList.add(this.CSS.questionInput);
    this.elements.questionInput.contentEditable = 'true';
    this.elements.questionInput.setAttribute(
      'placeholder',
      this.api.i18n.t('question'),
    );

    if (this.data.question) {
      this.elements.questionInput.innerText = this.data.question;
    }

    this.elements.answerInput = document.createElement('input');
    this.elements.answerInput.classList.add(this.CSS.input);
    this.elements.answerInput.classList.add(this.CSS.answerInput);
    this.elements.answerInput.placeholder = this.api.i18n.t('answer');

    this.elements.answerInput.onkeydown = (event) => {
      if (event.key === 'Enter') {
        this.handleEnterAnswer({ event });
      }
    };

    this.elements.tagsWrapper = document.createElement('div');
    this.elements.tagsWrapper.classList.add(this.CSS.tagsWrapper);

    this.renderTags();

    this.elements.additionalInput = document.createElement('input');
    this.elements.additionalInput.classList.add(this.CSS.input);
    this.elements.additionalInput.classList.add(this.CSS.additionalInput);
    this.elements.additionalInput.placeholder = this.api.i18n.t('answer');

    this.elements.additionalInput.onkeydown = (event) => {
      if (event.key === 'Enter') {
        this.handleEnterWord({ event });
      }
    };

    container.appendChild(hint);
    container.appendChild(this.elements.questionInput);
    container.appendChild(this.elements.answerInput);
    container.appendChild(this.elements.tagsWrapper);
    container.appendChild(this.elements.additionalInput);

    return container;
  }
}
