/**
 * Loading spinner React component.
 * @module src/Spinner
 */

import React from 'react';

import * as styles from './index.less';

/**
 * The spinner component.
 * @returns {React.ReactElement} The rendered spinner.
 */
export default function Spinner() {
    return <div className={styles.spinner} />;
}
