import React from 'react';
import { Link } from 'react-router';

import events, { eventShape } from '~/routes/events/events.js';
import styles from './home.less';

function Hero() {
    return <div className={styles.hero}>
        <h1>Welcome to IPACES.org!</h1>
    </div>;
}

function EventPreview(props) {
    const { event: {
        title, location, date
    } } = props;

    return <div className={styles.eventPreview}>
        <h3>{date}: <Link to='/events'>{title}</Link></h3>
        <h4>{location}</h4>
    </div>;
}

EventPreview.propTypes = {
    event: React.PropTypes.shape(eventShape)
};

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
        <h2>Upcoming Events</h2>
        <ul>{events.map((event, i) =>
            <li key={i}><EventPreview event={event} /></li>
        )}</ul>
    </div>;
}

