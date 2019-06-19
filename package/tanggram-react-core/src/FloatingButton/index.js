import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/styles';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import useConfig from 'Lib/Core/hook/useConfig';
import {TObject} from 'Lib/Core/prop_types';
import getRandomInt from 'Utils/getRandomInt';
import useDownwardFloating from 'Logic/hook/useDownwardFloating';
import {TFunction, TBool, TNumber, TString} from 'Lib/Core/prop_types';

const colors = (theme) => ({
  default: {
    backgroundColor: theme.design.default.fab,
    // backgroundImage: `linear-gradient(${theme.design.default.dark}, ${theme.design.default.light})`,
    color: '#FFFFFF',
  },
  reward: {
    backgroundColor: theme.design.reward.fab,
    // backgroundImage: `linear-gradient(${theme.design.reward.dark}, ${theme.design.reward.light})`,
    color: '#FFFFFF',
  },
  wealth: {
    backgroundColor: theme.design.wealth.fab,
    // backgroundImage: `linear-gradient(${theme.design.wealth.dark}, ${theme.design.wealth.light})`,
    color: '#FFFFFF',
  },
  center: {
    backgroundColor: theme.design.center.fab,
    // backgroundImage: `linear-gradient(${theme.design.center.dark}, ${theme.design.center.light})`,
    color: '#FFFFFF',
  },
});

const defaultStyle = (theme, variant = 'default', getTopPosition) => {
  return {
    ...{
      right: 16,
      top: getTopPosition(85),
      position: 'absolute',
      boxShadow: theme.design.boxShadow,
      // boxShadow: 'none',
      zIndex: 1000,
    },
    ...colors(theme)[variant],
  };
};

const defaultFloatingStyle = (theme, variant = 'default', noBottomNav = false, getTopPosition) =>{
  return {
    ...colors(theme)[variant],
    ...{
      right: 16,
      top: getTopPosition(16),
      // bottom: noBottomNav ? getBottomPosition(16) : getBottomPosition(66),
      position: 'fixed',
      zIndex: 1000,
    },
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    right: 16,
    top: ({getTopPosition}) => (getTopPosition(85)),
    position: 'absolute',
    boxShadow: theme.design.boxShadow,
    backgroundImage: colors(theme).default.backgroundImage,
    color: colors(theme).default.color,
    zIndex: 1000,
  },
}));

function FloatingButton({
  className,
  Icon,
  isStatic = false,
  noBottomNav = false,
  variant = 'default',
  style = {},
  onClick = () => {},
  floatingBreakPoint = 69,
  floatingStyle = {},
}) {
  const theme = useTheme();
  const config = useConfig();
  const {getTopPosition} = config;
  const classes = useStyles({getTopPosition});

  // const isFloatingTriggered = true;
  const isFloatingTriggered = useDownwardFloating(floatingBreakPoint);
  const [transitionIndex] = useState(getRandomInt(1, 5));

  function renderButton() {
    const _style = (isFloatingTriggered && !isStatic)
      ? {...defaultFloatingStyle(theme, variant, noBottomNav, getTopPosition), ...floatingStyle}
      : {...defaultStyle(theme, variant, getTopPosition), ...style};
    const _className = className ? className : classes.root;
    return (
      <Fab className={_className} onClick={onClick} style={_style}>
        {Icon}
      </Fab>
    );
  }

  function renderZoom() {
    return (
      <Zoom in={true}>
        {renderButton()}
      </Zoom>
    );
  }

  function renderSlide(direction = 'up') {
    return (
      <Slide direction={direction} in={true}>
        {renderButton()}
      </Slide>
    )
  }

  function randomRender(index) {
    switch (index) {
      case 1:
        return renderZoom();
      case 2:
        return renderSlide('up');
      case 3:
        return renderSlide('down');
      case 4:
        return renderSlide('left');
      case 5:
        return renderSlide('right');
      default:
        return renderZoom();
    }
  }

  return randomRender(transitionIndex);
}

FloatingButton.propTypes = {
  style: TObject,
  className: TString,
  isStatic: TBool,
  floatingBreakPoint: TNumber,
  floatingStyle: TObject,
  onClick: TFunction,
  Icon: TObject,
};

export default FloatingButton;
