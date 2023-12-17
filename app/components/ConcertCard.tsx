import {useEffect} from "react";
import {Link} from "@remix-run/react";

export function ConcertCard({concert}) {
    useEffect(() => {
        if (!concert) {
            throw new Error("No concert prop provided")
        }
    })
    return (<div className="border-2 rounded m-5 p-5 w-96 flex flex-col align-middle">
            <p className="font-bold">{new Date(concert.datetime).toString()}</p>
            <p>{concert.location.address}, {concert.location.city}</p>
            <p className="py-1 px-4 m-1 rounded-full border-2 border-orange-400 text-center w-fit">{concert.genre}</p>
            <Link className="m-3 px-5 py-2 bg-orange-400 rounded-lg font-bold text-center"
                  to={`concert/${concert.id}`}>Modify</Link>
        </div>
    )
}
