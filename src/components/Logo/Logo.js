import React from 'react';

import owLogo from '../../assets/logo.png';

import classes from './Logo.module.scss';

const Logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={owLogo} alt="OW Logo" />
        </div>
    );
}

export default Logo;