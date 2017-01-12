import React from 'react';
import { Link } from 'react-router';

export default function Home() {
    return <div>
        <h1>Welcome to IPACES.org!</h1>
        <p>
            International Professionals for the Advancement of Chinese Earth
            Sciences (IPACES) is a nonprofit organization established in 1999
            and is registered in the State of Michigan, USA.
        </p>
        <p>
            Membership in IPACES is by invitation only (see <Link
                to='/about/bylaws'>Bylaws</Link>).
        </p>
    </div>;
}

