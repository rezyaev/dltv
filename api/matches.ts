/// <reference types="node" />

export default {
	async fetch(_request: Request) {
		const response = await fetch(
			"https://api.pandascore.co/dota2/matches?filter[serie_id]=10728&sort=begin_at&page=1&per_page=10",
			{ headers: { accept: "application/json", Authorization: `Bearer ${process.env.PANDASCORE_TOKEN}` } },
		);

		const data = await response.json();

		return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
	},
};
