/**
 * Event list page.
 * @module src/routes/events
 */

import React from 'react';
import { shape, string, instanceOf } from 'prop-types';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import asyncComponent from 'src/async-component';
import Spinner from 'src/Spinner';
import events, { EventConfig } from './events.js';
import * as styles from './index.less';

const contentCtx = import.meta.webpackContext(
    './content', {
        regExp: /\.(js|md)$/,
    },
);

const AsyncNotFound = asyncComponent('src/NotFound', Spinner);

/**
 * React component for a single event.
 * @param {object} props - The component's props.
 * @param {module:src/routes/events/events.EventConfig} props.event - The event
 * configuration.
 * @returns {React.ReactElement} The component's elements.
 */
function EventComponent(props) {
    const { event: {
        title, location, date, contentPath,
    } } = props;

    /**
     * Callback for retrieving the content's component.
     * @returns {React.Component} The component.
     */
    function getContent() {
        return contentCtx(contentPath);
    }
    const Content = asyncComponent(getContent, Spinner);

    return (
        <div>
            <Link to=".."><h1>News &amp; Events</h1></Link>
            <h2>{title}</h2>
            <h4>{date}</h4>
            {location ? <h5>{location}</h5> : null }
            <Content />
        </div>
    );
}

EventComponent.propTypes = {
    event: instanceOf(EventConfig).isRequired,
};

/**
 * Attempts to render the event at the current path.
 * @param {object} props - The component's props.
 * @param {object} props.match.params.path - The matched event path.
 * @returns {React.ReactElement} The rendered event, or a 404 page.
 */
function EventMatcher(props) {
    const path = props.match.params.path + '/';
    if (!(path in events.byPath)) {
        return <AsyncNotFound {...props} />;
    }

    return <EventComponent event={events.byPath[path]} />;
}

EventMatcher.propTypes = {
    match: shape({
        params: shape({
            path: string.isRequired,
        }),
    }),
};

/**
 * Event list React component.
 * @returns {React.ReactElement} The component's elements.
 */
function EventList() {
    return (
        <div className={styles.eventList}>
            <h1>News &amp; Events</h1>
            {events.map((event, i) => {
                const {
                    title, location, date, path,
                } = event;

                return (
                    <div key={i} className={styles.eventItem}>
                        <Link to={`./${path}`}><h2>{title}</h2></Link>
                        <h4>{date}</h4>
                        {location ? <h5>{location}</h5> : null}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Event page React component.
 * @returns {React.ReactElement} The component's elements.
 */
export default function Events() {
    return (
        <div>
            <Switch>
                <Route path="/events/:path/" strict component={EventMatcher} />
                <Route
                    path="/events/:path"
                    render={({ match }) => {
                        const { path } = match.params;
                        return <Redirect to={`./${path}/`} />;
                    }}
                />
                <Route component={EventList} />
            </Switch>
        </div>
    );
}
