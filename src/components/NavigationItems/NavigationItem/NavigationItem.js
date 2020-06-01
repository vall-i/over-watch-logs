import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.scss';

const NavigationItem = props => {
  let navigationItem = null;

  switch (props.itemType) {
    case 'logout':
      navigationItem = (
        <NavLink
          to={props.link}
          exact={props.exact}
          activeClassName={classes.active}
          onClick={props.clicked}
        >
          {props.children}
        </NavLink>
      );
      break;

    default:
      navigationItem = (
        <NavLink
          to={props.link}
          exact={props.exact}
          activeClassName={classes.active}
        >
          {props.children}
        </NavLink>
      );
  }
  return <li className={classes.NavigationItem}>{navigationItem}</li>;
};

export default NavigationItem;
