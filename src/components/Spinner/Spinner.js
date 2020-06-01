import React from 'react';

import classes from './Spinner.module.scss';

const Spinner = props => {
    let wrapper = '';
    if (props.showBackground)  {
        wrapper = classes.Background;
    }

  return (
    <div className={wrapper}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
