import React, { Component } from 'react';

import AuthContext from '../../context/authentication';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

import classes from './Layout.module.scss';

class Layout extends Component {
  state = {
    sideDrawerIsShown: false,
  };

  toggleSideDrawerHandler = () => {
    this.setState(prevState => {
      return { sideDrawerIsShown: !prevState.sideDrawerIsShown };
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <AuthContext.Consumer>
          {context =>
            context.authenticated ? (
              <>
                <Toolbar drawerToggleClicked={this.toggleSideDrawerHandler} />
                <SideDrawer
                  isOpen={this.state.sideDrawerIsShown}
                  close={this.toggleSideDrawerHandler}
                />
              </>
            ) : null
          }
        </AuthContext.Consumer>
        <main className={classes.Content}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
