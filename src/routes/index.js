import React from 'react';
import { instanceOf, number } from 'prop-types';
import { Link } from 'react-router-dom';

import events, { EventConfig } from 'src/routes/events/events.js';
import HomeContent from './index.md';
import * as styles from './index.less';

/**
 * Hero image React component.
 * @returns {React.ReactElement} The component's elements.
 */
function Hero() {
    return (
        <div className={styles.hero}>
            <h1 className={styles.left}>Welcome to IPACES.org!</h1>
        </div>
    );
}

/**
 * Event preview React component.
 * @param {object} props - The component's props.
 * @param {module:src/routes/events/events.EventConfig} props.event - The event
 * configuration.
 * @returns {React.ReactElement} The component's elements.
 */
function EventPreview(props) {
    const { event: {
        title, location, date, path,
    } } = props;

    return (
        <div>
            <h3>
                <Link to={`/events/${path}`}>
                    {title}
                </Link>
            </h3>
            <p>
                {date}
                {location ? ': ' : ''}
                {location}
            </p>
        </div>
    );
}

EventPreview.propTypes = {
    event: instanceOf(EventConfig),
};

/**
 * Event list React component.
 * @param {object} props - The component's props.
 * @param {number} props.maxEvents - Maximum number of events to list.
 * @returns {React.ReactElement} The component's elements.
 */
function EventList(props) {
    const eventElems = events.slice(0, props.maxEvents).map((event, i) => {
        return (
            <li key={i}>
                <EventPreview event={event} />
            </li>
        );
    });

    if (eventElems.length === 0) {
        eventElems.push(<li key="none">No upcoming events.</li>);
    } else if (eventElems.length < events.length) {
        // Indicate there are more events to see.
        eventElems.push(
            <li key="more">
                <div>
                    <h3>
                        <Link to="/events/">Click to see more...</Link>
                    </h3>
                </div>
            </li>,
        );
    }

    return (
        <div>
            <Link to="/events/"><h2>News &amp; Events</h2></Link>
            <ul>{eventElems}</ul>
        </div>
    );
}

EventList.propTypes = {
    maxEvents: number,
};

/**
 * Home page React component.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Home() {
    return (
        <div className={styles.home}>
            <Hero />
            <HomeContent />
            <EventList maxEvents={3} />
        </div>
    );
}
