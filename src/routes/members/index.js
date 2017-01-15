import React from 'react';
import classNames from 'classnames';

import Modal from '~/components/modal';

import members from './members.csv';
import styles from './index.less';

const { string, bool, func, shape } = React.PropTypes;
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
    isOpen: bool,
    open: func
};

function MemberModal({ member, isOpen, close }) {
    const { position, field, department, email } = member;

    function stopPropagation(event) {
        event.stopPropagation();
    }

    return <div className={styles.modal} onClick={close}>
        <div className={styles.content} onClick={stopPropagation}>
            <div className={styles.close} onClick={close} />
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
    isOpen: bool,
    close: func
};

function Member(props) {
    const { member } = props;

    const { enter, enterActive, leave, leaveActive } = styles;
    return <Modal
        className={styles.member}
        transitionName={{
            enter, enterActive, leave, leaveActive
        }}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
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
        this.searchKeys = [
            'nameLast',
            'nameFirst',
            'nameZh',
            'location',
            'country'
        ];
        this.onInputChange = this.onInputChange.bind(this);
    }

    searchScore(member, searchString) {
        if (!searchString) {
            return;
        }

        const terms = searchString.toLowerCase().trim().split(/\s+/);

        return terms.reduce((score, term) =>
            score + (this.searchKeys.reduce(
                (str, key) => str + member[key].toLowerCase().trim(), ''
            ).indexOf(term) === -1 ? 0 : term.length),
            0
        );
    }

    onInputChange(event) {
        const field = event.target.getAttribute('data-field');
        this.setState({ [field]: event.target.value });
    }

    componentWillUpdate(nextProps, nextState) {
        const { searchString } = nextState;
        if (searchString !== this.state.searchString) {
            members.forEach(m =>
                (m.searchScore = this.searchScore(m, searchString))
            );
        }
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
                {members.filter(member =>
                    member.searchScore === void 0
                    || member.searchScore > 0
                ).sort((a, b) =>
                    b.searchScore - a.searchScore
                ).map((member, i) =>
                    <Member key={i} member={member} />
                )}
            </div>
        </div>;
    }
}

