import { useCallback, useEffect, useRef } from 'react';

import { setPropsInTool } from '@sb-ui/utils/editorjs/utils';

const isEmpty = (event, input) =>
  event.code === 'Backspace' && input?.innerText?.trim?.()?.length === 0;

export const useSimpleImage = ({ tool, data, loaded, error, src, setSrc }) => {
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

  const handleCaptionInput = useCallback(() => {
    setPropsInTool(tool, {
      caption: captionInputRef.current?.innerHTML,
    });
  }, [tool]);

  useEffect(() => {
    const { location, caption } = data;
    if (location) {
      setSrc(location);
      linkInputRef.current.innerText = location;
    }
    if (caption) {
      captionInputRef.current.innerHTML = caption;
    }
    setPropsInTool(tool, {
      location,
      caption,
      linkInputRef,
      captionInputRef,
    });
  }, [
    data.location,
    data.caption,
    data,
    tool,
    setSrc,
    linkInputRef,
    captionInputRef,
  ]);

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

  return {
    linkInputRef,
    captionInputRef,
    handleInputLinkKeyDown,
    handleInputCaptionKeyDown,
    handleLinkInput,
    handleCaptionInput,
    linkSrc: linkInputRef.current?.innerText,
  };
};
