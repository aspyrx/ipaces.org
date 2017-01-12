import React from 'react';
import { Link } from 'react-router';

import styles from './home.less';

function Hero() {
    return <div className={styles.hero}>
        <h1>Welcome to IPACES.org!</h1>
    </div>;
}

export default function Home() {
    return <div className={styles.home}>
        <Hero />
        <p>
            <strong>International Professionals for the Advancement of Chinese
                Earth Sciences</strong> (IPACES) is a nonprofit
            organization established in 1999
            and is registered in the State of Michigan, USA.
        </p>
        <p>
            Membership in IPACES is by invitation only (see <Link
                to='/about/bylaws'>Bylaws</Link>).
        </p>
    </div>;
}

