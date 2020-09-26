import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import siteAppBarStyles from './SiteAppBarStyles';

export default function SiteAppBar (props) {
  const classes = siteAppBarStyles();
  const { onDrawerOpen } = props;

  return (
    <>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            className={classes.drawerIcon}
            onClick={onDrawerOpen}
            edge='start'
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            React.js Meetup
          </div>
          <PopupState variant='popover' popupId='profile-popup-menu'>
            {(popupState) => (
              <>
                <IconButton
                  color='inherit'
                  edge='end'
                  {...bindTrigger(popupState)}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  {...bindMenu(popupState)}
                >
                  <MenuItem onClick={() => popupState.close()}>Profile</MenuItem>
                  <MenuItem onClick={() => popupState.close()}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </Toolbar>
      </AppBar>

    </>
  );
}

SiteAppBar.propTypes = {
  onDrawerOpen: PropTypes.func
};
