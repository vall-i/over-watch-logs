import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message  } from 'antd';

class Log extends Component {
  state = {
    heroes: {
      Tank: [
        'Reinhardt',
        'Winston',
        'Zarya',
        'Roadhog',
        'D.Va',
        'Orisa',
        'Wrecking Ball',
        'Sigma',
      ],
      Support: [
        'Mercy',
        'Zenyatta',
        'Lúcio',
        'Ana',
        'Moira',
        'Brigitte',
        'Baptiste',
      ],
      Damage: [
        'Tracer',
        'Reaper',
        'Widowmaker',
        'Pharah',
        'Torbjörn',
        'Hanzo',
        'Bastion',
        'Symmetra',
        'McCree',
        'Soldier 76',
        'Junkrat',
        'Mei',
        'Genji',
        'Sombra',
        'Doomfist',
        'Ashe',
        'Echo',
      ],
    },
  };

  onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key='1'>1st menu item</Menu.Item>
        <Menu.Item key='2'>2nd memu item</Menu.Item>
        <Menu.Item key='3'>3rd menu item</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
          Hover me, Click menu item <Icon type='down' />
        </a>
      </Dropdown>
    );
  }
}

export default Log;

/*
Tank heroes:
 Reinhardt
 Winston
  Zarya
 Roadhog 
 D.Va
 Orisa
 Wrecking Ball
 Sigma

Support heroes
 Mercy
Zenyatta
Lúcio
Ana
 Moira
Brigitte
 Baptiste

Damage
Tracer
Reaper
Widowmaker
Pharah
Torbjörn
 Hanzo
Bastion
Symmetra
McCree
 Soldier: 76
Junkrat
Mei
 Genji
Sombra
Doomfist
Ashe
Echo
*/
