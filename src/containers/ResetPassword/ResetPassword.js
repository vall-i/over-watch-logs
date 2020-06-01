import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import Card from '../../components/Card/Card';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import classes from './ResetPassword.module.scss';

class ResetPassword extends Component {
  state = {
    confirmDirty: false,
    loading: false,
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const data = {
          token: this.props.match.params.token,
          password: values.password,
        };

        axios
          .put('/reset/password', data)
          .then(res => {
            this.setState({ loading: false });
            console.log(res);
            this.props.history.push('/login');
            console.log(this.props);
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
        sm: { span: 8 },
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
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className={classes.ResetPassword}>
        <Card>
          <h1>Reset your password</h1>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {loading && <Spinner showBackground />}
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='New Password' hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                  {
                    min: 6,
                    message:
                      'Your password must be between 6 and 18 characters!',
                  },
                  {
                    pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,18}$/,
                    message:
                      'Your password must contain at least one uppercase letter or one lowercase letter and at least one number digit!',
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
              <Button type='primary' htmlType='submit'>
                Send
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const WrappedResetPassword = Form.create({ name: 'reset' })(ResetPassword);

export default WrappedResetPassword;
