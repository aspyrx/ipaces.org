import React from 'react';

import eventConfigs from './events.csv';

const { string } = React.PropTypes;

function dateType(props, key, name, required) {
    if (!(key in props) && !required) {
        return;
    }

    if (props[key] instanceof Date) {
        return;
    }

    return new Error(
        `Invalid prop '${key}' supplied to '${name}':`
        + ` expected instanceof Date, got ${props[key]}`
    );
}

dateType.isRequired = function(props, key, name) {
    return dateType(props, key, name, true);
};

const eventShape = {
    title: string.isRequired,
    startDate: dateType,
    endDate: dateType,
    start: string.isRequired,
    end: string.isRequired,
    date: string.isRequired,
    location: string.isRequired,
    contentPath: string.isRequired
};

function parseConfigDateString(str) {
    return new Date(Date.parse(str));
}

function formatDate(date) {
    return date.toLocaleDateString(void 0, { timeZone: 'UTC' });
}

function Event(config) {
    const { title, startDate, endDate, location, contentPath } = config;

    this.title = title;
    this.startDate = parseConfigDateString(startDate);
    this.endDate = endDate ? parseConfigDateString(endDate) : null;
    this.location = location;
    this.contentPath = contentPath;

    this.start = formatDate(this.startDate);
    this.end = this.endDate ? formatDate(this.endDate) : null;

    if (!this.end || this.start === this.end) {
        this.date = this.start;
    } else {
        this.date = `${this.start} - ${this.end}`;
    }
}

const events = eventConfigs.map(config => new Event(config))
    .sort((a, b) => a.startDate - b.startDate);

export { events as default, eventShape };

