import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Form, InputNumber, Button, Radio, DatePicker, message } from 'antd';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';

import classes from './CreateLog.module.scss';


class CreateLog extends Component {
  state = {
    error: null,
    loading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ error: null, loading: true });
        const log = {
          role: values.role,
          rating: values.rating,
          date: values.date,
        };
        console.log('Received values of form: ', values);
        axios
          .post('/log/create', log)
          .then(res => {
            this.setState({ loading: false});
            message.success('The Log has been successfully created!', 1.3)
          })
          .catch(err => {
            this.setState({ error: err.data.message });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error, loading } = this.state;

    let form = loading ? (
      <Spinner />
    ) : (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('role', {
            initialValue: '1',
            rules: [
              {
                required: true,
                message: 'Please choose your role!',
              },
            ],
          })(
            <Radio.Group buttonStyle='solid' size='large'>
              <Radio.Button value='1'>Tank</Radio.Button>
              <Radio.Button value='2'>Damage</Radio.Button>
              <Radio.Button value='3'>Support</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('date', {
            initialValue: moment(),
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select time!',
              },
            ],
          })(<DatePicker size='large' />)}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('rating', {
            // initialValue: 1,
            rules: [
              {
                required: true,
                message: 'You forgot to type your rating!',
              },
            ],
          })(<InputNumber min={1} max={6000} size='large' />)}
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
    return (
      <div className={classes.CreateLog}>
        <Card>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {form}
        </Card>
      </div>
    );
  }
}

const WrappedCreateLog = Form.create({ name: 'createLog' })(CreateLog);

export default WrappedCreateLog;
