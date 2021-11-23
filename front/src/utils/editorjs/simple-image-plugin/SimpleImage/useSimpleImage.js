import { useCallback, useEffect, useRef } from 'react';

import { setPropsInTool } from '@sb-ui/utils/editorjs/utils';

const isEmpty = (event, input) =>
  event.code === 'Backspace' && input?.innerText?.trim?.()?.length === 0;

export const useSimpleImage = ({ tool, loaded, error, src, setSrc }) => {
  const linkInputRef = useRef(null);
  const captionInputRef = useRef(null);

  const handleInputLinkKeyDown = useCallback(
    (event) => {
      if (isEmpty(event, linkInputRef.current)) {
        tool.api.blocks.delete();
      }
    },
    [tool],
  );

  const handleInputCaptionKeyDown = useCallback((event) => {
    if (isEmpty(event, captionInputRef.current)) {
      linkInputRef.current.focus();
    }
  }, []);

  const handleLinkInput = useCallback(() => {
    setSrc(linkInputRef.current?.innerText);
  }, [setSrc]);

  useEffect(() => {
    if (loaded && src?.length > 0) {
      setPropsInTool(tool, {
        error: false,
      });
    }
  }, [loaded, src, tool]);

  useEffect(() => {
    if (error) {
      setPropsInTool(tool, {
        error: true,
      });
    }
  }, [error, tool]);

  useEffect(() => {
    setPropsInTool(tool, {
      linkInputRef,
      captionInputRef,
    });
    if (tool.data.location) {
      setSrc(tool.data.location);
      linkInputRef.current.innerText = tool.data.location;
    }
  }, [setSrc, tool]);

  useEffect(() => {
    if (loaded && tool.data.caption) {
      captionInputRef.current.innerHTML = tool.data.caption;
    }
  }, [loaded, tool.data.caption]);

  return {
    linkInputRef,
    captionInputRef,
    handleInputLinkKeyDown,
    handleInputCaptionKeyDown,
    handleLinkInput,
    linkSrc: linkInputRef.current?.innerText,
  };
};
