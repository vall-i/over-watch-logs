import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import AuthContext from '../../context/authentication';

import classes from './NavigationItems.module.scss';

const NavigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Main Page
      </NavigationItem>
      <NavigationItem link='/create'>Create Log</NavigationItem>
      <AuthContext.Consumer>
        {context => (
          <NavigationItem
            clicked={context.logout}
            itemType='logout'
            link='/login'
          >
            Logout
          </NavigationItem>
        )}
      </AuthContext.Consumer>
    </ul>
  );
};

export default NavigationItems;
