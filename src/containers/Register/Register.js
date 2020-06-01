import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Icon, Tooltip, Button } from 'antd';

import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import classes from './Register.module.scss';

class SignUp extends Component {
  state = {
    confirmDirty: false,
    error: null,
    loading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ error: null, loading: true });
        console.log('Received values of form: ', values);
        const data = {
          name: values.name,
          email: values.email,
          password: values.password,
        };

        axios
          .post('/user/signup', data)
          .then(res => {
            this.setState({ loading: false });
            // localStorage.setItem('token', res.data.token);
            this.props.history.push('/login');
          })
          .catch(error => {
            console.log(error.response);
            this.setState({
              error: error.response.data.message,
              loading: false,
            });
          });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, loading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 10,
        },
        sm: {
          span: 15,
          offset: 7,
        },
      },
    };

    return (
      <div className={classes.Register}>
        <Card>
          <h1>Create your account</h1>
          {error &&
          error ===
            'User validation failed: email: E-mail address already exists.' ? (
            <ErrorMessage>E-mail address already exists.</ErrorMessage>
          ) : null}
          {loading && <Spinner showBackground />}
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='E-mail'>
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
              })(<Input />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Name&nbsp;
                  <Tooltip title='What do you want others to call you?'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label='Password' hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                  {
                    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,18}$/,
                    message: 'Must be 6-18 chars (include 1 letter and number)',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label='Confirm Password' hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                className={classes.Button}
                type='primary'
                htmlType='submit'
              >
                Register
              </Button>
              <Link to={'/login'} className={classes.loginFormForgot}>
                Login in
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const wrappedSignUp = Form.create({ name: 'register' })(SignUp);

export default wrappedSignUp;
