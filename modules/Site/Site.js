import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import theme from './Theme';
import SiteAppBar from './SiteAppBar';
import SidebarDrawer from './SidebarDrawer';
import useStyles from './SiteStyles';

export default function Site (props, ref) {
  const sheets = new ServerStyleSheets();
  const { activeMenu } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const expandedState = JSON.parse(localStorage.getItem('drawerExpand') || false);
    setExpandDrawer(expandedState);
  }, []);
  const [expandDrawer, setExpandDrawer] = useState(true);

  const classes = useStyles();

  const toggleDrawerExpandCollapse = () => {
    const expand = !expandDrawer;
    setExpandDrawer(expand);
    localStorage.setItem('drawerExpand', expand);
  };

  return (
    <>
      {sheets.collect(
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />
            <SiteAppBar onDrawerOpen={toggleDrawerExpandCollapse} />
            <SidebarDrawer expanded={expandDrawer} activeMenu={activeMenu} />
            <main className={classes.content}>
              <Toolbar className={classes.mainTopPlaceholder} />
              {props.children}
            </main>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

Site.propTypes = {
  children: PropTypes.any,
  activeMenu: PropTypes.array
};
