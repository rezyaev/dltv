const TOKEN = import.meta.env.VITE_PANDASCORE_TOKEN;

const requestInit = { headers: { accept: "application/json", authorization: `Bearer ${TOKEN}` } };

export async function fetchMatches() {
	const response = await fetch(
		"https://api.pandascore.co/dota2/matches?filter[serie_id]=10728&sort=begin_at&page=1&per_page=10",
		requestInit,
	);

	return (await response.json()) as Promise<Match[]>;
}

export type Match = {
	number_of_games: number;
	serie: Serie;
	scheduled_at: string;
	original_scheduled_at: string;
	serie_id: number;
	forfeit: boolean;
	begin_at: string;
	draw: boolean;
	game_advantage: number | null;
	videogame: Videogame;
	match_type: "best_of" | "single_elimination" | "all_games_played";
	modified_at: string;
	status: "not_started" | "running" | "finished" | "canceled" | "postponed";
	winner_id: number | null;
	results: Result[];
	winner: Team | null;
	videogame_title: string | null;
	live: Live;
	detailed_stats: boolean;
	rescheduled: boolean;
	videogame_version: string | null;
	id: number;
	name: string;
	tournament: Tournament;
	league: League;
	league_id: number;
	tournament_id: number;
	winner_type: "Team" | "Player";
	end_at: string | null;
	slug: string;
	opponents: Opponent[];
	games: Game[];
	streams_list: Stream[];
};

type Videogame = {
	id: number;
	name: string;
	slug: string;
};

type Serie = {
	id: number;
	name: string;
	year: number;
	begin_at: string;
	end_at: string;
	winner_id: number | null;
	slug: string;
	winner_type: string;
	modified_at: string;
	league_id: number;
	season: string | null;
	full_name: string;
};

type Result = {
	score: number;
	team_id: number;
};

type Live = {
	supported: boolean;
	url: string | null;
	opens_at: string | null;
};

type Tournament = {
	id: number;
	name: string;
	type: string;
	country: string;
	begin_at: string;
	detailed_stats: boolean;
	end_at: string;
	winner_id: number | null;
	slug: string;
	winner_type: string;
	modified_at: string;
	league_id: number;
	serie_id: number;
	prizepool: string | null;
	tier: string;
	has_bracket: boolean;
	region: string;
	live_supported: boolean;
};

type League = {
	id: number;
	name: string;
	url: string | null;
	slug: string;
	modified_at: string;
	image_url: string | null;
};

export type Team = {
	id: number;
	name: string;
	location: string;
	slug: string;
	modified_at: string;
	acronym: string | null;
	image_url: string | null;
	dark_mode_image_url: string | null;
};

type Opponent = {
	type: "Team" | "Player";
	opponent: Team;
};

type GameWinner = {
	id: number | null;
	type: "Team" | "Player";
};

type Game = {
	complete: boolean;
	id: number;
	position: number;
	status: "not_started" | "running" | "finished" | "canceled" | "postponed";
	length: number | null;
	finished: boolean;
	match_id: number;
	winner: GameWinner;
	begin_at: string | null;
	detailed_stats: boolean;
	end_at: string | null;
	forfeit: boolean;
	winner_type: "Team" | "Player";
};

type Stream = {
	main: boolean;
	language: string;
	embed_url: string | null;
	official: boolean;
	raw_url: string;
};
