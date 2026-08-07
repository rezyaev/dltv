/// <reference types="node" />

export default {
	async fetch(request: Request) {
		const status = new URL(request.url).searchParams.get("status");

		const response = await fetch(`https://api.pandascore.co/dota2/matches/${status}?sort=begin_at&page=1&per_page=10`, {
			headers: { accept: "application/json", Authorization: `Bearer ${process.env.PANDASCORE_TOKEN}` },
		});

		const data = await response.json();

		return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
	},
};
