import React, { Component } from 'react';

import { Modal, Button } from 'antd';

const withErrorHandler = WrappedComponent => {
  return class extends Component {
    state = {
      visible: true,
    };

    okButtonHandler = event => {
      this.setState({
        visible: false,
      });
    };

    render() {
      return (
        <>
          <Modal
            visible={this.state.visible}
            onOk={this.okButtonHandler}
            footer={<Button key="back" onClick={this.okButtonHandler}>Return</Button>}
          >
            <p>Somehting went wrong!</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
