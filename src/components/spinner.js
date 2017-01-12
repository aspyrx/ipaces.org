import React from 'react';
import classnames from 'classnames';

import styles from './spinner.less';

export default class Spinner extends React.Component {
    constructor() {
        super();

        this.state = { action: 'spin' };
    }

    componentWillUnmount() {
        this.setState({ action: 'unmount' });
    }

    render() {
        const { action } = this.state;
        return <div className={classnames(styles.spinner, styles[action])} />;
    }
}

