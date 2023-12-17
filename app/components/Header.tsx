import {Link} from "@remix-run/react";

export function Header() {
    return (<header>
            <p>Remix</p>
        <nav>
            <Link to={`/artists`}>Artists</Link>
            <Link to={`/concerts`}>Concerts</Link>
        </nav></header>
    )
}