import styled from 'styled-components';
import Connector from '../../util/connector/';
import PropTypes, { SettingType } from '../prop-types';

const StyledBaseContent = styled.article`
  box-sizing: border-box;
  margin: ${({ containerVerticalMargin, containerHorizontalMargin }) => `${containerVerticalMargin}px ${containerHorizontalMargin}px`};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')}
  
  .content_footer {
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    height: ${() => `${Connector.setting.getContentFooterHeight()}px`};
    small {
      font-size: 11px;
    }
  }
`;

const StyledHtmlContent = ({ setting }) => `
  @font-face {
    font-family: os_specific;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText-Light"),
         local(".HelveticaNeueDeskInterface-Light"),
         local(".LucidaGrandeUI"),
         local("Ubuntu Light"),
         local("Segoe UI Light"),
         local("Roboto-Light"),
         local("DroidSans"),
         local("Tahoma");
  }

  font-size: ${Connector.setting.getFontSize()};
  line-height: ${Connector.setting.getNovelLineHeight()};
  font-family: ${setting.font ? setting.font : 'os_specific'};
  
  h1, h2, h3, h4, h5, h6, p, th, td, div, label, textarea, a, li, input, button, textarea, select, address {
    font-size: 1em;
    line-height: inherit;
    font-family: inherit;
    text-align: justify;
  }
  
  img {
    max-width: 100%;
  }
`;

const StyledImageContent = ({ width, height, visible }) => `
  width: ${width};
  height: ${height};
  
  img {
    display: block;
    transition: opacity 1s linear;
    opacity: ${visible ? '1' : '0'};
  }
`;

const StyledScrollContent = () => `
  padding: ${Connector.setting.getPadding()};
`;

const StyledPageContent = ({ width, height }) => `
  width: ${width};
  height: ${height};
  vertical-align: top;
  white-space: initial;
  display: inline-block;
  overflow: hidden;
  
  .content_container {
    height: 100%;
    column-fill: auto;
    column-gap: ${Connector.setting.getColumnGap()};
    column-width: ${Connector.setting.getColumnWidth()};
  }
`;

export const StyledHtmlScrollContent = StyledBaseContent.extend`
  ${StyledHtmlContent}
  ${StyledScrollContent}

  position: absolute;
  top: ${({ visible, startOffset }) => `${visible ? startOffset : -999}px`};
`;

export const StyledHtmlPageContent = StyledBaseContent.extend`
  ${StyledHtmlContent}
  ${StyledPageContent}
`;

export const StyledImageScrollContent = StyledBaseContent.extend`
  ${StyledImageContent}
  ${StyledScrollContent}
  margin: 0 auto;
  .content_container {
    margin: 0 auto;
    width: ${() => Connector.setting.getContentWidth()};
    img {
      width: 100%;
    }
  }
`;

export const StyledImagePageContent = StyledBaseContent.extend`
  ${StyledImageContent}
  ${StyledPageContent}
  
  margin: 0 auto;
  .content_container {
    &.two_images_in_page {
      .comic_page {
        &:nth-child(odd) { img { margin-right: 0; } }
        &:nth-child(even) { img { margin-left: 0; } }
      }
    } 
    
    .comic_page {
      height: 100%;
      img {
        width: auto; height: auto;
        max-width: 100%; max-height: 100%;
        top: 50%;
        transform: translateY(-50%);
        position: relative;
        margin: 0 auto;
      }
      &.has_content_footer {
        img {
          max-height: calc(100% - ${() => Connector.setting.getContentFooterHeight()}px);
          top: calc(50% - ${() => Connector.setting.getContentFooterHeight() / 2}px);
        }
        .content_footer {
          text-align: center;
        }
      }
    }
  }
`;

const propTypes = {
  index: PropTypes.number,
  visible: PropTypes.bool,
  containerVerticalMargin: PropTypes.number,
  containerHorizontalMargin: PropTypes.number,
  startOffset: PropTypes.number,
  setting: SettingType,
  width: PropTypes.string,
  height: PropTypes.string,
};

StyledHtmlScrollContent.propTypes = propTypes;
StyledHtmlPageContent.propTypes = propTypes;
StyledImageScrollContent.propTypes = propTypes;
StyledImagePageContent.propTypes = propTypes;
