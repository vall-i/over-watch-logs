import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Layout from './containers/Layout/Layout';
import RecoveryPassword from './containers/RecoveryPassword/RecoveryPassword';
import ReserPassword from './containers/ResetPassword/ResetPassword';
import CreateLog from './containers/CreateLog/CreateLog';
import AuthContext from './context/authentication';

const MainPage = React.lazy(() => import('./containers/MainPage/MainPage'));

class App extends Component {
  state = {
    isAuthenticated: !!localStorage.token,
  };

  render() {
    const { isAuthenticated } = this.state;
    console.log(isAuthenticated);
    let routes = (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/recovery/password' component={RecoveryPassword} />
        <Route path='/register' component={Register} />
        <Route path='/reset/password/:token' component={ReserPassword} />
        <Redirect to='/login' />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/create' component={CreateLog} />
          <Route path='/' component={MainPage} />
        </Switch>
      );
    }
    return (
      <div>
        <AuthContext.Provider
          value={{
            authenticated: isAuthenticated,
            logout: () => {
              localStorage.clear();
              this.setState({ isAuthenticated: false })
            },
            login: () => {
              this.setState({ isAuthenticated: true })
            },
          }}
        >
          <Layout>{routes}</Layout>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
