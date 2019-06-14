/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import {PagingContext, SettingContext, StatusContext} from '../../contexts';
import {columnGap, columnsInPage, isScroll} from '../../SettingUtil';
import Events, { SET_CONTENT } from '../../Events';
import ReaderJsHelper from '../../ReaderJsHelper';
import EpubService from '../../EpubService';
import * as styles from './styles';

const EpubReader = () => {
  const contentRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [content, setContent] = React.useState('');
  const pagingState = React.useContext(PagingContext);
  const settingState = React.useContext(SettingContext);
  const statusState = React.useContext(StatusContext);

  const setSpineContent = (spines: Array<String>) => setContent(spines.join(''));

  React.useEffect(() => {
    if (contentRef.current) {
      ReaderJsHelper.mount(contentRef.current, isScroll(settingState));
    }

    Events.on(SET_CONTENT, setSpineContent);

    return () => {
      Events.off(SET_CONTENT, setSpineContent);
    };
  }, []);

  React.useEffect(() => {
    const invalidate = () => EpubService.invalidate(pagingState.currentPage, isScroll(settingState), columnGap(settingState), columnsInPage(settingState));
    const updateCurrent = () => {
      if (!statusState.startToRead) return;
      EpubService.updateCurrent(pagingState.pageUnit, isScroll(settingState), columnsInPage(settingState));
    };

    window.addEventListener('resize', invalidate);
    window.addEventListener('scroll', updateCurrent);
    return () => {
      window.removeEventListener('resize', invalidate);
      window.removeEventListener('scroll', updateCurrent);
    };
  }, [settingState, pagingState, statusState]);

  React.useEffect(() => {
    if (contentRef.current) {
      ReaderJsHelper.mount(contentRef.current, isScroll(settingState));
    }
    EpubService.invalidate(pagingState.currentPage, isScroll(settingState), columnGap(settingState), columnsInPage(settingState));
  }, [settingState]);

  return (
    <div
      id="reader_root"
      css={styles.wrapper(settingState)}
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default EpubReader;
