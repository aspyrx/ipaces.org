import React from 'react';

import events from './events.csv';

const { string } = React.PropTypes;

function dateType(props, key, name) {
    if (props[key] instanceof Date) {
        return;
    }

    return new Error(
        `Invalid prop '${key}' supplied to '${name}':`
        + ` expected instanceof Date, got ${props[key]}`
    );
}

const eventShape = {
    title: string.isRequired,
    start: dateType.isRequired,
    end: dateType.isRequired,
    location: string.isRequired,
    contentPath: string.isRequired
};

function parseDateString(str) {
    return new Date(Date.parse(str));
}

function eventDateString(date) {
    return date.toLocaleDateString(void 0, { timeZone: 'UTC' });
}

events.forEach(event => {
    event.start = parseDateString(event.start);
    event.end = parseDateString(event.end);
});

export { events as default, eventShape, eventDateString };

