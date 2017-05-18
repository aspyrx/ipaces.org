import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';

import asyncComponent from '~/components/asyncComponent';
import NotFound from '~/components/NotFound';
import events, { eventShape } from './events.js';

const { shape, string } = React.PropTypes;

const contentCtx = require.context(
    'bundle-loader?lazy!./content',
    true,
    /\.(js|md)$/
);

function Event(props) {
    const { event: {
        title, location, date, contentPath
    } } = props;

    const Content = asyncComponent(contentCtx(contentPath));

    return <div>
        <Link to=".."><h1>Events</h1></Link>
        <h2>{title}</h2>
        <h3>{date}</h3>
        <h4>{location}</h4>
        <Content />
    </div>;
}

Event.propTypes = {
    event: shape(eventShape)
};

function EventMatcher(props) {
    const path = props.match.params.path + '/';
    if (!(path in events.byPath)) {
        return <NotFound {...props} />;
    }

    return <Event event={events.byPath[path]} />;
}

EventMatcher.propTypes = {
    match: shape({
        params: shape({
            path: string.isRequired
        })
    })
};

function EventList() {
    return <div>
        <h1>Events</h1>
        {events.map((event, i) => {
            const {
                title, location, date, path
            } = event;

            return <div key={i}>
                <Link to={`./${path}`}><h2>{title}</h2></Link>
                <h3>{date}</h3>
                <h4>{location}</h4>
            </div>;
        })}
    </div>;
}

export default function Events() {
    return <div>
        <Switch>
            <Route path="/events/:path/" strict component={EventMatcher} />
            <Route path="/events/:path" render={({ match }) => {
                const { path } = match.params;
                return <Redirect to={`./${path}/`} />;
            }} />
            <Route component={EventList} />
        </Switch>
    </div>;
}

