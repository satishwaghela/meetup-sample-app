import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleIcon from '@material-ui/icons/People';
import menuStyles from './MenuStyles';

const CustomLink = forwardRef((props, ref) => <a {...props} href={props.to} />);

export default function Menu (props) {
  const { activeMenu = [] } = props;

  return (
    <List>
      {_.map(menus, (menu) => {
        return (
          <MenuItem
            {...menu}
            active={activeMenu.includes(menu.key)}
          />
        );
      })}
    </List>
  );
}

Menu.propTypes = {
  activeMenu: PropTypes.array
};

function MenuItem (props) {
  const classes = menuStyles();
  const { label, icon, to, active } = props;

  return (
    <ListItem
      button
      component={CustomLink}
      to={to}
      className={clsx({
        [classes.listItem]: true,
        [classes.activeListItem]: active
      })}
    >
      <ListItemIcon
        className={clsx({
          [classes.activeListItem]: active,
          [classes.menuIcon]: true
        })}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

MenuItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  to: PropTypes.string,
  active: PropTypes.bool
};

export const menus = {
  dashboard: {
    icon: <DashboardIcon />,
    label: 'Dashboard',
    to: '/',
    key: 'dashboard'
  },
  add: {
    icon: <AccountBoxIcon />,
    label: 'Add Participant',
    to: '/add',
    key: 'add'
  },
  list_participants: {
    icon: <PeopleIcon />,
    label: 'Participants',
    to: '/participants',
    key: 'participants'
  }
};
