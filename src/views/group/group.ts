import type { Match } from "../matches/matches";
import { groupBy } from "lodash-es";

export const ROUNDS = [
	[new Array(8).fill({})],
	[new Array(4).fill({}), new Array(4).fill({})],
	[new Array(2).fill({}), new Array(4).fill({}), new Array(2).fill({})],
];

export function extractGroup(matches: Match[]) {
	const finished = matches.filter((m) => m.status === "finished");
	console.log(groupBy(finished, (m) => m.name.slice(0, m.name.indexOf(":"))));
}
