import React, { Component } from 'react';

import { Modal, Button } from 'antd';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };
      
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
  
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount() {
      if (true) {
        // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor);
      }
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    okButtonHandler = event => {
      this.setState({
        error: null,
      });
    };

    render() {
      const { error } = this.state;
      return (
        <>
          <Modal
            visible={!!error}
            onOk={this.okButtonHandler}
            footer={<Button key="back" onClick={this.okButtonHandler}>Return</Button>}
          >
            {error ? <p>{error.message}</p> : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
