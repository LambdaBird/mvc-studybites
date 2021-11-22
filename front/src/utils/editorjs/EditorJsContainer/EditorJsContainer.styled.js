import styled, { createGlobalStyle } from 'styled-components';

import variables from '@sb-ui/theme/variables';

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
    gap: 1rem;
  }
  .toolbox-item-none{
    display: none!important;
  }
  .ct.ct--bottom{
    display: none;
  }

  @media (min-width: 651px) {
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

  @media (max-width: 650px){
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
    .ce-toolbar__actions{
      top: 1rem;
    }

    .toolbox-input-search{
      display: none;
    }

    .hidden{
      visibility: hidden;
    }

    .editor-plus-toolbar{
      top : 0;
      position : absolute;
      display: flex;
      width: calc(100% + 25px);
      justify-content: space-between;
      gap: 0.5rem;
    }

    .d-none{
      display: none;
    }

    .ce-toolbar{
      display: none;
    }

    .ce-toolbar__actions{
      opacity: 1;
      background-color: ${variables['gray-4']};
      top: 0.5rem;
      right: -25px;

    }
  }

  @media(min-width: 651px){
    .editor-plus-toolbar{
      display: none;
    }
  }


  .cte-toolbox-upper{
    transform: translate3d(0px,calc(-100% + 25px),0px)!important;
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

export const ToolbarWrapper = styled.div`
  height: 400px;
  width: 100%;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0px 6px 16px rgb(0 0 0 / 8%),
    0px 9px 28px 8px rgb(0 0 0 / 5%);
  color: ${variables['editorjs-grey-color']};

  overflow-y: scroll;
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

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  width: 100%;
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
