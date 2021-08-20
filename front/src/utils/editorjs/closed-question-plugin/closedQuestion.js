import * as Utils from '../utils';

import './closedQuestion.css';

const MAX_ANSWER_LENGTH = 50;

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export default class ClosedQuestion {
  constructor({ data, api, readOnly }) {
    this.api = api;
    this.data = data;
    this.readOnly = readOnly;
    this.container = null;
    this.elements = [];
    this.answers = [this.api.i18n.t('example')];
  }

  static get toolbox() {
    return {
      title: 'Closed Question',
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C6.5 3 2 6.6 2 11C2 13.2 3.1 15.2 4.8 16.5C4.8 17.1 4.4 18.7 2 21C4.4 20.9 6.6 20 8.5 18.5C9.6 18.8 10.8 19 12 19C17.5 19 22 15.4 22 11C22 6.6 17.5 3 12 3ZM12 17C7.6 17 4 14.3 4 11C4 7.7 7.6 5 12 5C16.4 5 20 7.7 20 11C20 14.3 16.4 17 12 17ZM12.2 6.5C11.3 6.5 10.6 6.7 10.1 7C9.5 7.4 9.2 8 9.3 8.7H11.3C11.3 8.4 11.4 8.2 11.6 8.1C11.8 8 12 7.9 12.3 7.9C12.6 7.9 12.9 8 13.1 8.2C13.3 8.4 13.4 8.6 13.4 8.9C13.4 9.2 13.3 9.4 13.2 9.6C13 9.8 12.8 10 12.6 10.1C12.1 10.4 11.7 10.7 11.5 10.9C11.1 11.2 11 11.5 11 12H13C13 11.7 13.1 11.5 13.1 11.3C13.2 11.1 13.4 11 13.6 10.8C14.1 10.6 14.4 10.3 14.7 9.9C15 9.5 15.1 9.1 15.1 8.7C15.1 8 14.8 7.4 14.3 7C13.9 6.7 13.1 6.5 12.2 6.5V6.5ZM11 13V15H13V13H11Z" fill="currentColor"/></svg>',
    };
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      container: 'closed-question-tool',
      questionInput: 'closed-question-tool__question-input',
      answerInput: 'closed-question-tool__answer-input',
      answerTag: 'closed-question-tool__answer-tag',
      answerWrapper: 'closed-question-tool__answer-wrapper',
      answerRemove: 'closed-question-tool__answer-remove',
      tooltip: 'closed-question-tool__tooltip',
      tooltipText: 'closed-question-tool__tooltipText',
    };
  }

  render() {
    const container = document.createElement('div');
    this.container = container;
    container.classList.add(this.CSS.container);

    const questionInput = document.createElement('div');
    questionInput.classList.add(this.CSS.input);
    questionInput.classList.add(this.CSS.questionInput);
    questionInput.contentEditable = 'true';
    questionInput.setAttribute('placeholder', this.api.i18n.t('question'));
    this.elements.questionInput = questionInput;

    if (this.data.question) {
      questionInput.innerHTML = this.data.question;
    }

    const answerInput = Utils.createInput({
      wrapper: this,
      name: 'answerInput',
      placeholder: this.api.i18n.t('answer'),
      classList: [this.CSS.input, this.CSS.answerInput],
    });

    const explanationInput = Utils.createInput({
      wrapper: this,
      name: 'explanationInput',
      placeholder: this.api.i18n.t('explanation'),
      classList: [this.CSS.input, this.CSS.answerInput],
    });
    if (this.data.explanation) {
      explanationInput.value = this.data.explanation;
    }

    const answerWrapper = document.createElement('div');
    this.elements.answerWrapper = answerWrapper;
    answerWrapper.classList.add(this.CSS.answerWrapper);
    answerWrapper.innerText = this.api.i18n.t('tag_title');

    if (this.data.answers) {
      this.answers = this.data.answers;
    }

    this.renderTags();

    answerInput.addEventListener(
      'keydown',
      (event) => {
        // KeyCode enter
        if (event.keyCode === 13) {
          this.enterPressed(event);
        }
      },
      false,
    );

    container.appendChild(questionInput);
    container.appendChild(answerInput);
    container.appendChild(explanationInput);
    container.appendChild(answerWrapper);

    return container;
  }

  static get isReadOnlySupported() {
    return true;
  }

  renderTags() {
    const answerTags = this.answers.map((text) => this.createTag(text));
    const spans = Array.from(this.elements.answerWrapper.childNodes).filter(
      (x) => x.tagName === 'SPAN',
    );
    spans.forEach((span) => {
      span.remove();
    });
    answerTags.forEach((answerTag) => {
      this.elements.answerWrapper.appendChild(answerTag);
      answerTag
        .querySelector(`.${this.CSS.answerRemove}`)
        .addEventListener('click', () => {
          this.removeTag(answerTag);
        });
    });
    if (answerTags.length === 0) {
      const noneText = document.createElement('span');
      noneText.innerText = this.api.i18n.t('none');
      this.elements.answerWrapper.appendChild(noneText);
    }
  }

  removeTag(tag) {
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
    this.renderTags();
  }

  renderNew(renderParams) {
    const oldView = this.container;
    if (oldView) {
      oldView.parentNode.replaceChild(this.render(renderParams), oldView);
    }
  }

  enterPressed(event) {
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
      this.renderTags();
    }
    this.elements.answerInput.value = '';
  }

  createTag(text) {
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
      const tooltiptext = document.createElement('div');
      tooltiptext.classList.add(this.CSS.tooltipText);
      tooltiptext.innerText = text;

      displayText.appendChild(textSpan);
      displayText.appendChild(tooltiptext);
    }

    const removeSpan =
      createElementFromHTML(`<span class='${this.CSS.answerRemove}'>
       <svg viewBox='64 64 896 896' focusable='false' data-icon='close' width='10px' height='10px' fill='currentColor' aria-hidden='true'>
        <path d='M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'></path>
       </svg>
      </span>
    `);
    wrapper.appendChild(displayText);
    wrapper.appendChild(removeSpan);
    return wrapper;
  }

  static get enableLineBreaks() {
    return true;
  }

  save() {
    const question = this.elements?.questionInput?.innerHTML;
    const explanation = this.elements?.explanationInput?.value;
    const { answers } = this;
    if (!question || answers?.length === 0) {
      return null;
    }
    return {
      question,
      explanation,
      answers,
    };
  }
}