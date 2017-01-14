import React from 'react';

import members from './members.csv';
import styles from './index.less';

function padIf(left, str, right = '') {
    return str ? left + str + right : '';
}

function Member(props) {
    const { className, member: {
        nameLast, nameFirst, nameZh, link, locationLink, email,
        position, field, department, location, country
    } } = props;

    return <div className={className}>
        <h2>
            <a href={link}>
                {nameLast}, {nameFirst}{padIf(' [', nameZh, ']')}
            </a>
        </h2>
        <h3><a href={locationLink}>{location}</a>, {country}</h3>
        <p>{position}{padIf(', ', field)}{padIf(', ', department)}</p>
        <p>Email: {email.replace('@', ' [at] ')}</p>
    </div>;
}

const { shape, string } = React.PropTypes;
Member.propTypes = {
    member: shape({
        nameLast: string.isRequired,
        nameFirst: string.isRequired,
        position: string.isRequired,
        location: string.isRequired,
        country: string.isRequired,
        email: string.isRequired,
        nameZh: string.isRequired,
        link: string.isRequired,
        locationLink: string.isRequired,
        field: string.isRequired,
        department: string.isRequired
    }),
    className: string
};

export default class Members extends React.Component {
    constructor() {
        super();

        this.state = { searchString: '' };
        this.filter = this.filter.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    filter(member) {
        const { searchString } = this.state;

        return Object.keys(member).reduce(
            (str, key) => str + member[key].toLowerCase().trim(), ''
        ).indexOf(
            searchString.toLowerCase().trim()
        ) !== -1;
    }

    onInputChange(event) {
        const field = event.target.getAttribute('data-field');
        this.setState({ [field]: event.target.value });
    }

    render() {
        return <div className={styles.members}>
            <div className={styles.header}>
                <h1>Members</h1>
                <input
                    type="text"
                    placeholder="Search"
                    data-field="searchString"
                    onChange={this.onInputChange}
                />
            </div>
            <div className={styles.memberList}>
                {members.filter(this.filter).map((member, i) =>
                    <Member
                        key={i}
                        className={styles.member}
                        member={member}
                    />
                )}
            </div>
        </div>;
    }
}

