import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.scss';

const SideDrawer = props => {
    let attachedClasses = props.isOpen ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];
  return (
    <>
      <Backdrop showBackdrop={props.isOpen} clicked={props.close} />
      <div className={attachedClasses.join(' ')} onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
