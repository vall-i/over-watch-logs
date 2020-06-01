import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.scss';

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.MobileOnly}>
          <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
