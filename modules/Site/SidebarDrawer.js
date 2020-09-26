import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Menu from './Menu';
import sidebarDrawerStyles from './SidebarDrawerStyles';

export default function SidebarDrawer (props) {
  const classes = sidebarDrawerStyles();

  const { expanded, anchor = 'left', activeMenu } = props;

  useEffect(() => {
    const ssHoverExpanded = JSON.parse(sessionStorage.getItem('hoverExpanded') || 'false');
    setHoverExpanded(ssHoverExpanded);
  }, []);
  const [hoverExpanded, setHoverExpanded] = useState(false);
  const [transition, enableTransition] = useState(false);
  const enterTimeOut = useRef();

  const _enableTransition = () => {
    enableTransition(true);
    window.setTimeout(() => {
      enableTransition(false);
    }, 300);
  };

  const drawerPropsForExpanded = {};
  if (expanded) {
    drawerPropsForExpanded.variant = 'permanent';
  } else {
    drawerPropsForExpanded.onMouseEnter = (e) => {
      enterTimeOut.current = window.setTimeout(() => {
        setHoverExpanded(true);
        _enableTransition();
        sessionStorage.setItem('hoverExpanded', true);
      }, 300);
    };
    drawerPropsForExpanded.onMouseLeave = (e) => {
      window.clearTimeout(enterTimeOut.current);
      setHoverExpanded(false);
      _enableTransition();
      sessionStorage.setItem('hoverExpanded', false);
    };
  }

  return (
    <Drawer
      anchor={anchor}
      className={clsx({
        [classes.drawer]: true,
        [classes.drawerExpanded]: !!expanded
      })}
      classes={{
        paper: clsx({
          [classes.drawerPaperBoxShadow]: hoverExpanded,
          [classes.drawerPaperTransition]: transition,
          [classes.drawerPaper]: !expanded && !hoverExpanded,
          [classes.drawerExpandedPaper]: expanded || hoverExpanded
        })
      }}
      variant='permanent'
      {...drawerPropsForExpanded}
    >
      <Toolbar />
      <Menu activeMenu={activeMenu} />
    </Drawer>
  );
}

SidebarDrawer.propTypes = {
  anchor: PropTypes.string,
  expanded: PropTypes.bool,
  activeMenu: PropTypes.array
};
