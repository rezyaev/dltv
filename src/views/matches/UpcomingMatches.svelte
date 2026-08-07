<script lang="ts">
	import { fetchMatches, type Match, type Team } from "./matches";
	import { groupBy } from "lodash-es";
	import { format, isBefore, isThisWeek, isToday, isTomorrow, isYesterday } from "date-fns";

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

<div>
	{#await fetchMatches("running") then matches}
		{#if matches.length > 0}
			<div class="mb-4">
				<h2 class="mb-2 ml-2 text-sm font-bold text-base-content/60 first-letter:uppercase">Текущие</h2>
				<ul class="list bg-base-300 rounded-xl">
					{#each matches as match}
						{@render MatchSnippet(match)}
					{/each}
				</ul>
			</div>
		{/if}
	{/await}

	{#await fetchMatches("upcoming") then matches}
		{#each groupByDate(matches) as group}
			<div class="mb-4">
				<h2 class="mb-2 ml-2 text-sm font-bold text-base-content/60 first-letter:uppercase">
					{formatGroupDate(group[0].begin_at)}
				</h2>
				<ul class="list bg-base-300 rounded-xl">
					{#each group as match}
						{@render MatchSnippet(match)}
					{/each}
				</ul>
			</div>
		{/each}
	{/await}
</div>

{#snippet MatchSnippet(match: Match)}
	<li class="list-row items-center gap-6">
		{#if isBefore(match.begin_at, new Date())}
			<span class="badge badge-sm badge-secondary uppercase font-bold">Live</span>
		{:else}
			<span class="text-base-content/60 font-bold">{format(match.begin_at, "HH:mm")}</span>
		{/if}

		<div class="flex flex-col gap-2">
			{#each match.opponents as opponent}
				{@render TeamSnippet(opponent.opponent)}
			{/each}
		</div>
		<div></div>
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
