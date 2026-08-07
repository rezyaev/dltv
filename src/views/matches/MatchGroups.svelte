<script lang="ts">
	import { format, isThisWeek, isToday, isTomorrow, isYesterday } from "date-fns";
	import { type Match, type Team } from "./matches";
	import { groupBy } from "lodash-es";

	let {
		matches,
		live = false,
		showResults = false,
	}: { matches: Match[]; live?: boolean; showResults?: boolean } = $props();

	function groupByDate(matches: Match[]) {
		const dateMatchesMap = groupBy(matches, (match) => {
			const date = new Date(match.begin_at);
			return date.toLocaleDateString();
		});

		return Object.values(dateMatchesMap);
	}

	function formatGroupDate(date: string): string {
		const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

		if (isToday(date)) return rtf.format(0, "day");
		if (isTomorrow(date)) return rtf.format(1, "day");
		if (isYesterday(date)) return rtf.format(-1, "day");

		if (isThisWeek(date)) {
			return new Date(date).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
		}

		return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
	}
</script>

{#each groupByDate(matches) as group}
	<div class="mb-4">
		<h2 class="mb-2 ml-2 text-sm font-bold text-base-content/60 first-letter:uppercase">
			{formatGroupDate(group[0].begin_at)}
		</h2>
		<ul class="list bg-base-300 rounded-xl">
			{#each group as match}
				{@render MatchRow(match)}
			{/each}
		</ul>
	</div>
{/each}

{#snippet MatchRow(match: Match)}
	<li class="list-row items-center gap-6 px-6">
		{#if live}
			<span class="badge badge-sm badge-secondary uppercase font-bold">Live</span>
		{:else}
			<span class="text-base-content/60 font-bold w-12">{format(match.begin_at, "HH:mm")}</span>
		{/if}

		<div class="flex flex-col gap-2">
			{#each match.opponents as opponent}
				{@render TeamSnippet(opponent.opponent)}
			{/each}
		</div>

		{#if showResults}
			{@const score1 = match.results[0].score}
			{@const score2 = match.results[1].score}

			<div class="flex flex-col gap-2 font-bold">
				<span class={{ "text-success": score1 > score2, "text-error": score2 > score1 }}>{score1}</span>
				<span class={{ "text-success": score2 > score1, "text-error": score1 > score2 }}>{score2}</span>
			</div>
		{/if}
	</li>
{/snippet}

{#snippet TeamSnippet(team: Team)}
	<div class="gap-2 flex items-center">
		{#if team.dark_mode_image_url || team.image_url}
			<img class="h-4" alt="logo" src={team.dark_mode_image_url ?? team.image_url} />
		{/if}

		<span>{team.name}</span>
	</div>
{/snippet}
