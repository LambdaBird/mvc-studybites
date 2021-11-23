import { useCallback, useEffect, useRef, useState } from 'react';

import {
  isDivInputEmpty,
  isRealInputEmpty,
  setPropsInTool,
  stopRepeating,
} from '../../utils';
import { PATTERNS, SERVICES } from '../services';

export const useEmbed = ({ tool }) => {
  const [link, setLink] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [embedHTML, setEmbedHTML] = useState('');
  const contentRef = useRef(null);
  const contentHeight = useRef(null);
  const embedRef = useRef(null);
  const linkRef = useRef(null);
  const captionRef = useRef(null);

  const handleLinkInput = useCallback((event) => {
    setLink(event.target.value);
  }, []);

  const handleLinkKeyDown = useCallback(
    (event) => {
      if (isRealInputEmpty(event, linkRef.current)) {
        if (stopRepeating(event)) {
          return;
        }
        tool.api.blocks.delete();
      }
    },
    [tool],
  );

  const handleCaptionDown = useCallback((event) => {
    if (isDivInputEmpty(event, captionRef.current)) {
      if (stopRepeating(event)) {
        return;
      }
      linkRef.current.focus();
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const service = Object.keys(PATTERNS).find((x) => PATTERNS[x].test(link));
    const {
      regex,
      embedUrl,
      width,
      height,
      id = (ids) => ids.shift(),
    } = SERVICES?.[service] || {};
    const result = regex?.exec(link)?.slice(1);
    setPropsInTool(tool, { isValid: !!result });
    if (result) {
      const embed = embedUrl.replace(/<%= remote_id %>/g, id(result));
      const { html } = SERVICES[service] || {};
      contentHeight.current = height;
      embedRef.current = embed;
      setEmbedHTML(html);
      setIsLoaded(true);
      setPropsInTool(tool, {
        saveData: {
          service,
          source: link,
          embed,
          width,
          height,
        },
      });
    } else {
      setEmbedHTML('');
      setIsLoaded(false);
      setPropsInTool(tool, {
        saveData: {},
      });
    }
  }, [link, tool]);

  useEffect(() => {
    setPropsInTool(tool, {
      url: linkRef.current,
      caption: captionRef.current,
    });
  }, [tool, isLoaded]);

  useEffect(() => {
    if (embedHTML?.length > 0 && link?.length > 0) {
      contentRef.current.firstChild.setAttribute('src', embedRef.current);
    }
  }, [embedHTML, link]);

  useEffect(() => {
    if (tool.data.inputUrl) {
      setLink(tool.data.inputUrl);
    }
  }, [tool]);

  useEffect(() => {
    if (isLoaded && tool.data.caption) {
      captionRef.current.innerHTML = tool.data.caption;
    }
  }, [tool, isLoaded]);

  return {
    linkRef,
    contentRef,
    captionRef,
    embedHTML,
    link,
    isLoaded,
    handleLinkInput,
    handleCaptionDown,
    handleLinkKeyDown,
    contentHeight: contentHeight.current,
  };
};
