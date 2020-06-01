import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../../context/authentication';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import classes from './Login.module.scss';

class Login extends Component {
  state = {
    error: null,
    loading: false,
  };

  static contextType = AuthContext;

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ error: null, loading: false });
        const data = {
          email: values.email,
          password: values.password,
        };
        axios
          .post('user/login', data)
          .then(res => {
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
            this.setState({ loading: true });
            this.context.login();
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({
              error: error.response.data.message,
              loading: false,
            });
            console.log(error.response);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, loading } = this.state;

    let form = (
      <Form onSubmit={this.handleSubmit} className={classes.loginForm}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input placeholder='E-mail' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,18}$/,
                message: 'Must be 6-18 chars (include 1 letter and number)',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input type='password' placeholder='Password' />)}
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={classes.loginFormButton}
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to={'/recovery/password'} className={classes.loginFormForgot}>
            Forgot password
          </Link>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    );

    return (
      <div className={classes.Login}>
        <Card>
          <h1>Login</h1>
          {loading && <Spinner showBackground />}
          {error && <ErrorMessage>{error} Try again!</ErrorMessage>}
          {form}
        </Card>
      </div>
    );
  }
}

const WrappedLogin = Form.create({ name: 'normal_login ' })(Login);

export default WrappedLogin;
