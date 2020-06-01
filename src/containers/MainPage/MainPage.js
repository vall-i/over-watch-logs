import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Table, Button, Tag, Modal, message } from 'antd';

import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';
// import Log from '../../components/Log/Log';

import classes from './MainPage.module.scss';

const key = 'updatable';

class MainPage extends Component {
  state = {
    logs: [],
    roles: {
      1: { label: 'Tank', color: '#218ffe' },
      2: { label: 'Damage', color: '#4A4C4E' },
      3: { label: 'Support', color: '#FA9C1D' },
    },
    loading: false,
    error: false,
    idToDel: null,
    modalText: 'Are you sure you want to delete the log?',
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    this.setState({loading: true});
    axios
      .get('/log/list')
      .then(res => {
        const receivedLogs = res.data.data;
        this.setState({ logs: receivedLogs, loading: false });
      })
      .catch(err => {
        console.log(err.response);
        
        this.setState({ error: true, loading: false });
      });
  };

  deleteLogHandler = () => {
    const { logs, idToDel } = this.state;
    message.loading({content: 'Deleting...', key});
    axios.delete(`log/delete/${idToDel}`).then(res => {
      const updatedLogs = logs.filter(log => log._id !== idToDel);
      this.setState({
        logs: updatedLogs,
        idToDel: null,
      });
      message.success({content: 'The Log has been successfully deleted!', key, duration: 1})
    });
  };

  goToCreateLogHandler = () => {
    this.props.history.push('/create');
  };

  render() {
    const { roles, logs, error, loading, idToDel } = this.state;

    let logsTable = (
      <>
        <p
          className={classes.MessageNoLogs}
          style={{
            textAlign: 'center',
            fontSize: '24px',
            color: '#FA9C1D',
            marginTop: '40px',
          }}
        >
          You have no logs yet!
        </p>
        <Button type='primary' onClick={this.goToCreateLogHandler}>
          Create Log!
        </Button>
      </>
    );
    if (error) {
      logsTable = <ErrorMessage>Something went wrong!</ErrorMessage>;
    }
    if (logs.length) {
      const columns = [
        {
          title: 'Role',
          dataIndex: 'role',
          render: role => {
            return <Tag color={roles[role].color}>{roles[role].label}</Tag>;
          },
        },
        {
          title: 'Character/Hero',
          dataIndex: 'characters',
          render: tags => {},
        },
        {
          title: 'Map',
          dataIndex: 'map',
        },
        {
          title: 'Previous Rank',
          dataIndex: 'previousRank',
        },
        {
          title: 'Rank',
          dataIndex: 'rank',
        },
        {
          title: 'Result',
          dataIndex: 'result',
          render: res => (res > 0 ? `+${res}` : res),
        },
        {
          title: 'Date',
          dataIndex: 'date',
          render: date => moment(date).format('DD-MM-YYYY'),
        },
        // {
        //   title: 'Updated at',
        //   dataIndex: 'updated',
        //   render: updated => moment(updated).format('DD-MM-YYYY'),
        // },
        {
          dataIndex: '_id',
          render: id => (
              <Button
                type='danger'
                onClick={() => this.setState({ idToDel: id })}
              >
                Delete
              </Button>
          ),
        },
      ];
      const data = logs.map(log => {
        return {
          _id: log._id,
          role: log.role,
          characters: log.heroes,
          map: log.map,
          previousRank: log.previousRating,
          rank: log.rating,
          result: log.result,
          date: log.date,
          // updated: log.updatedAt,
        };
      });
      logsTable = <Table columns={columns} dataSource={data} rowKey='_id' />;
    }

    return (
      <div className={classes.MainPage}>
        <Card>
          {!loading ? (
            <>
              <Modal
                // title='Are you sure you want to delete the log?'
                onOk={this.deleteLogHandler}
                visible={!!idToDel}
                onCancel={() => this.setState({ idToDel: null })}
                footer={[
                  <Button
                    key={'cancel'}
                    onClick={() => this.setState({ idToDel: null })}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key={'delete'}
                    type='danger'
                    onClick={this.deleteLogHandler}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <p style={{ fontSize: 18 }}>{this.state.modalText}</p>
              </Modal>
              {logsTable}
            </>
          ) : (
            <Spinner />
          )}
        </Card>
      </div>
    );
  }
}

export default MainPage;
