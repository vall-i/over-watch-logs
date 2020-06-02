import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import classes from './RecoveryPassword.module.scss';

class RecoveryPassword extends Component {
  state = {
    emailSentMessage: false,
    error: null,
    loading: false,
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ error: null, loading: true });
        const data = {
          email: values.email,
        };
        console.log('Received values of form: ', values);
        axios
          .post('user/recovery', data)
         
          .then(res => {
            console.log(res);
            this.setState({ emailSentMessage: true, loading: false });
          })
          .catch(error => {
            console.log(error.response.data.message);
            this.setState({
              error: error.response.data.message,
              loading: false,
            });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { emailSentMessage, error, loading } = this.state;

    let form = emailSentMessage ? (
      <p>
        An email has been sent to the supplied email address. Please, follow the
        instruction in the email to reset your password.
      </p>
    ) : (
      <>
        <p>
          We will send a password reset link to your email address.
        </p>
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
            <Button
              type='primary'
              htmlType='submit'
              className={classes.loginFormButton}
            >
              Reset password
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to={'/login'}>Login in</Link>
          </Form.Item>
        </Form>
      </>
    );

    return (
      <div className={classes.RecoveryPassword}>
        <Card>
          <h1>Recover your password</h1>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading && <Spinner showBackground />}
          {form}
        </Card>
      </div>
    );
  }
}

const WrappedRecoveryPassword = Form.create({ name: 'normal_login ' })(
  RecoveryPassword
);

export default WrappedRecoveryPassword;
