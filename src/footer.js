import React from 'react';
import { Link } from 'react-router';

import styles from './footer.less';

export default function Footer({ routes }) {
    const links = routes.filter(route =>
        'title' in route
    ).map(({ name, title }, i) =>
        <Link key={i} to={`/${name}`}>{title}</Link>
    );

    return <div className={styles.footer}>
        <div className={styles.navigation}>
            <Link to='/'>Home</Link>
            {links}
            <div className={styles.right}>
                <span>
                    <a href="mailto:ipacesweb@gmail.com">
                        Contact the webmaster
                    </a>
                </span>
                <span>
                    Site design by <a href="https://szz.io">Stan Zhang</a>
                </span>
            </div>
        </div>
    </div>;
}

const { arrayOf, shape, string } = React.PropTypes;
Footer.propTypes = {
    routes: arrayOf(shape({
        name: string.isRequired,
        title: string
    }))
};

