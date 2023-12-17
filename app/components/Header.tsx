import {Link} from "@remix-run/react";

export function Header() {
    return (<header className="flex flex-row justify-between items-center bg-stone-900 p-10">
            <Link to="/" className="text-4xl text-orange-50 font-bold">MelodyMap</Link>
            <nav>
                <Link to={`/artists`} className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold">Artists</Link>
                <Link to={`/concerts`} className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold">Concerts</Link>
            </nav>
        </header>
    )
}