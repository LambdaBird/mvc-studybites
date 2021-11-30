import styled, { createGlobalStyle } from 'styled-components';

import variables from '@sb-ui/theme/variables';

import { BLOCK_BUTTONS, START_TITLE } from './useToolbar/constants';

export const Container = styled.div`
  width: 100%;
  .codex-editor--narrow {
    .codex-editor__redactor {
      margin-right: 0;
    }
    .ce-block--focused {
      margin-right: 0;
      padding-right: 0;
    }
    .ce-toolbar__plus {
      left: -34px;
    }
  }
`;

export const GlobalStylesEditorPage = createGlobalStyle`
  .codex-editor__redactor{
    display: flex;
    flex-direction: column;
  }
  .ct.ct--bottom{
    display: none;
  }

  .ce-block{
    padding-bottom: 1rem;
    &:only-child{
      .${START_TITLE}:before{
        content: '${(props) => props.startTitle || ''}';
      }
    }
  }
  
  @media (min-width: 651px) {
    .ce-settings {
      right: unset;  
    }
    .ce-toolbox-active{
      color: ${variables['editorjs-primary-color']}
    }
    .codex-editor--narrow {
      .codex-editor__redactor {
        margin-right: 0;
      }
      .ce-block--focused {
        margin-right: 0;
        padding-right: 0;
      }
      .ce-toolbar__plus {
        left: -34px;
      }
    }
  }


  .toolbox-input-search{
    &:focus{
      outline: none;
    }
    border: 1px solid #d9d9d9;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
  }

  .ce-toolbar__plus::after{
    content: '${(props) => props.toolbarHint}';
    position: absolute;
    left: 36px;
    width: 200px;
    user-select: none;
    pointer-events: none;
    color: ${variables['editorjs-grey-color']};
  }

  .ce-toolbox{
    flex-direction: column;
    align-items: flex-start;
    transform: translate3d(0px,0px,0px)!important;
    background-color: white;
    height: 400px;
    overflow-y: scroll;
    padding: 1rem;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    .ce-toolbox__button{
      width: 100%;
      display: flex;
      justify-content: start;
      -webkit-animation: none;
      animation:  none;
    }

    .toolbox-basic-items-title, .toolbox-interactive-items-title{
      user-select: none;
      color: rgba(0, 0, 0, 0.45);
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      margin-bottom: 0.5rem;
    }

    .toolbox-interactive-items, .toolbox-basic-items{
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
    }
    .toolbox-basic-items{
      margin-bottom: 1rem;
    }
    .toolbox-svg-wrapper{
      border: 1px solid #F5F5F5;
      padding: 8px;
      height: 36px;
      width: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        height: 20px;
        width: 20px;
      }
    }

    .toolbox-item-wrapper{
      display: flex;
      margin-left: 1rem;
      align-items: center;
      user-select: none;
      .toolbox-item-data-name{
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
      }
      .toolbox-item-data-description{
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }

  .ce-toolbar{
    display: none;
  }

  .editor-plus-toolbar{
    top : 0;
    position : absolute;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    width: calc(100% + 25px);
    opacity: 1;
    visibility: visible;
    background-color: unset;
    border: 0;
    box-shadow: unset;
    border-radius: 0;
    z-index: unset;

  }
  
  @media (max-width: 650px){
    .editor-plus-toolbar{
      left: 0;
      justify-content: space-between;
      width: calc(100% + 25px);
    }
    .ce-toolbar{
      width: 100%;
      height: 50px;
      ${(props) => (props.isOpen ? `             height: unset;` : '')}
    }

    .ce-toolbar__content{
      width: 100%;
    }

    .ce-toolbox{
      width: 200px;
      padding: 0.25rem 0 0 0;
      box-shadow: none;
    }
    .toolbox-input-search{
      display: none;
    }

    .hidden{
      visibility: hidden;
    }


    .ce-toolbar__actions{
      opacity: 1;
      background-color: ${variables['gray-4']};
      top: 0.5rem;
      right: -25px;

    }
  }

  .d-none{
    display: none;
  }
  
  
  @media(min-width: 651px){
    .none-events{
      pointer-events: none;
    }
    
    .editor-plus-toolbar{
      margin-left: 15px;
    }
    .undo-margin{
      margin-left: 0;
    }
    .ce-toolbar__actions{
      position: initial;
      opacity: 1;
      right: 0;
      margin-left: 25px;
    }
  }

  @media(min-width: 650px) and (max-width: 750px){
    .editor-plus-toolbar{
      margin-left: 5px;
    }
    .ce-toolbar__actions{
      margin-left: 30px;
    }
  }


  .cte-toolbox-upper{
    transform: translate3d(0px,calc(-100% + 16px),0px)!important;
    align-items: flex-end;
  }
`;

export const PlusToolbar = styled.div`
  font-size: 1rem;
  color: ${(props) =>
    props.active
      ? variables['editorjs-primary-color']
      : variables['editorjs-grey-color']};
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;

  @media (min-width: 651px) {
    pointer-events: all;
    max-width: 650px;
  }
`;

export const ToolbarWrapper = styled.div`
  height: 400px;
  width: 100%;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0px 6px 16px rgb(0 0 0 / 8%),
    0px 9px 28px 8px rgb(0 0 0 / 5%);
  color: ${variables['editorjs-grey-color']};

  overflow-y: scroll;
  @media (min-width: 651px) {
    width: 300px;
  }
`;

export const SearchInput = styled.input`
  &:focus {
    outline: none;
  }
  border: 1px solid #d9d9d9;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  width: 100%;
  @media (max-width: 650px) {
    display: none;
  }
`;

export const BlocksTitle = styled.div`
  user-select: none;
  color: rgba(0, 0, 0, 0.45);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

export const InteractiveBlocksTitle = styled(BlocksTitle)`
  margin-top: 1rem;
`;

export const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;

export const BlockWrapper = styled.div.attrs({
  className: BLOCK_BUTTONS,
})`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  width: 100%;
  &:hover,
  &:active {
    color: ${variables['editorjs-primary-color']} !important;
  }
`;
export const BlockImage = styled.div`
  border: 1px solid ${variables['gray-3']};
  padding: 8px;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 20px;
    width: 20px;
  }
`;
export const DataWrapper = styled.div`
  margin-left: 0.5rem;
`;
export const Name = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
`;
export const Description = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
`;
