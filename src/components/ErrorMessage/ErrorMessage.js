import React from 'react';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = props => {
    return (
        <div className={classes.ErrorMessage}>{props.children}</div>
    );
}

export default ErrorMessage;