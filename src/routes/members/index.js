import React from 'react';
import classNames from 'classnames';

import Modal from '~/components/modal';

import members from './members.csv';
import styles from './index.less';

const { shape, string } = React.PropTypes;
const memberShape = {
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
};

function padIf(left, str, right = '') {
    if (left) {
        return str ? left + str + right : '';
    }

    return str ? str + right : '';
}

function MemberButton({ member, isOpen, open }) {
    const {
        nameLast, nameFirst, nameZh, link,
        location, locationLink, country
    } = member;

    const classes = classNames(styles.button, {
        [styles.open]: isOpen
    });

    function stopPropagation(event) {
        event.stopPropagation();
    }

    return <div className={classes} onClick={open}>
        <h2>
            <a href={link || void 0} onClick={stopPropagation}>
                {nameLast}, {nameFirst}{padIf(' [', nameZh, ']')}
            </a>
        </h2>
        <h3>
            <a href={locationLink || void 0} onClick={stopPropagation}>
                {location}
            </a>, {country}
        </h3>
    </div>;
}

MemberButton.propTypes = {
    member: shape(memberShape),
    isOpen: React.PropTypes.bool,
    open: React.PropTypes.func
};

function MemberModal({ member, isOpen, close }) {
    const { position, field, department, email } = member;

    const classes = classNames(styles.modal, {
        [styles.open]: isOpen
    });

    return <div className={classes} onClick={close}>
        <div className={styles.content}>
            <MemberButton member={member} isOpen={isOpen} />
            <h4>
                {position}
                {padIf(', ', field)}
                {padIf(', ', department)}
            </h4>
            <p>Email: {email.replace('@', ' [at] ')}</p>
        </div>
    </div>;
}

MemberModal.propTypes = {
    member: shape(memberShape),
    isOpen: React.PropTypes.bool,
    close: React.PropTypes.func
};

function Member(props) {
    const { member } = props;

    return <Modal
        className={styles.member}
        button={<MemberButton member={member} />}
    >
        <MemberModal member={member} />
    </Modal>;
}

Member.propTypes = {
    className: string,
    member: shape(memberShape)
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
            <div className={styles.list}>
                {members.filter(this.filter).map((member, i) =>
                    <div key={i} className={styles.item}>
                        <Member member={member} />
                    </div>
                )}
            </div>
        </div>;
    }
}

