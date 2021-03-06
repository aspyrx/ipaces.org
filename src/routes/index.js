import React from 'react';
import { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';

import events, { EventConfig } from 'src/routes/events/events.js';
import asyncComponent from 'src/async-component';
import HomeContent from 'bundle-loader?lazy!./index.md';
import styles from './index.less';

/**
 * Hero image React component.
 *
 * @returns {ReactElement} The component's elements.
 */
function Hero() {
    return <div className={styles.hero}>
        <h1 className={styles.left}>Welcome to IPACES.org!</h1>
    </div>;
}

/**
 * Event preview React component.
 *
 * @param {Object} props - The component's props.
 * @param {module:src/routes/events/events.EventConfig} props.event - The event
 * configuration.
 * @returns {ReactElement} The component's elements.
 */
function EventPreview(props) {
    const { event: {
        title, location, date, path
    } } = props;

    return <div>
        <h3><Link to={`/events/${path}`}>
            {title}
        </Link></h3>
        <p>{date} @ {location}</p>
    </div>;
}

EventPreview.propTypes = {
    event: instanceOf(EventConfig)
};

/**
 * Event list React component.
 *
 * @returns {ReactElement} The component's elements.
 */
function EventList() {
    const now = new Date();

    let eventElems = events.filter(event => {
        if (event.startDate > now) {
            return true;
        }

        if (event.endDate && event.endDate > now) {
            return true;
        }

        return false;
    }).map((event, i) => {
        return <li key={i}>
            <EventPreview event={event} />
        </li>;
    });

    if (eventElems.length === 0) {
        eventElems = <p>
            No upcoming events.
            <Link to="/events/">Click here to view past events.</Link>
        </p>;
    } else {
        eventElems = <ul>{eventElems}</ul>;
    }

    return <div>
        <Link to="/events/"><h2>Upcoming Events</h2></Link>
        {eventElems}
    </div>;
}

/**
 * Home page React component.
 *
 * @returns {ReactElement} The component's elements.
 */
export default function Home() {
    const Content = asyncComponent(HomeContent);

    return <div className={styles.home}>
        <Hero />
        <Content />
        <EventList />
    </div>;
}

