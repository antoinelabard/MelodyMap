import {Concert} from "~/models/Concert";
import {Artist} from "~/models/Artist";

type Data = {
    artists: Artist[],
    concerts: Concert[],
    cities: string[]
}
