import { Col } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

import useMobile from '@sb-ui/hooks/useMobile';
import {
  ChildrenType,
  ClassNameType,
  HandleHideType,
  HideOnScrollType,
  IsFixedType,
} from '@sb-ui/utils/types';

import * as S from './Header.styled';
import { HEADER_HEIGHT } from './Header.styled';

const Header = ({
  isFixed,
  className,
  hideOnScroll,
  bottom,
  children,
  handleHide,
}) => {
  const isMobile = useMobile();

  const headerRef = useRef(null);
  const [scroll, setScroll] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (hideOnScroll !== true || !headerRef) {
      return () => {};
    }

    let lastScrollTop = 0;
    const listener = () => {
      const scrollTop = window.scrollY;

      if (scrollTop < lastScrollTop) {
        setScroll('up');
      } else if (scrollTop > HEADER_HEIGHT) {
        setScroll('down');
      }
      lastScrollTop = scrollTop;
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, [headerRef, hideOnScroll]);

  const handleHeaderClick = useCallback(() => {
    if (isMobile && isVisible) {
      setIsVisible(false);
    }
  }, [isMobile, isVisible]);

  useEffect(() => {
    if (typeof handleHide === 'function') {
      handleHide?.(scroll === 'down');
    }
  }, [handleHide, scroll]);

  return (
    <>
      <S.Container
        isFixed={isFixed}
        className={className}
        hideOnScroll={hideOnScroll}
        scroll={scroll}
        ref={headerRef}
        onClick={handleHeaderClick}
      >
        <S.RowMain>
          <Col>
            <S.ChildrenWrapper>
              {children}
              <div>
                <S.MoreButton />
              </div>
            </S.ChildrenWrapper>
          </Col>
        </S.RowMain>
        {bottom}
      </S.Container>
    </>
  );
};

Header.propTypes = {
  children: ChildrenType,
  className: ClassNameType,
  isFixed: IsFixedType,
  bottom: ChildrenType,
  hideOnScroll: HideOnScrollType,
  handleHide: HandleHideType,
};

export default Header;
