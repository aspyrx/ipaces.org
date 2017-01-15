import React from 'react';

import asyncComponent from '~/components/asyncComponent';
import events, { eventShape } from './events.js';

const { shape } = React.PropTypes;

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
        <h2>{title}</h2>
        <h3>{date}</h3>
        <h4>{location}</h4>
        <Content />
    </div>;
}

Event.propTypes = {
    event: shape(eventShape)
};

export default function Events() {
    return <div>
        <h1>Events</h1>
        {events.map((event, i) =>
            <Event key={i} event={event} />
        )}
    </div>;
}

