<script lang="ts">
	import { fetchMatches, type Match } from "./matches";
	import { groupBy } from "lodash-es";
	import { isThisWeek, isToday, isTomorrow, isYesterday } from "date-fns";
	import MatchRow from "./MatchRow.svelte";

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
						<MatchRow match={match} live={true} showResults={true} />
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
						<MatchRow match={match} />
					{/each}
				</ul>
			</div>
		{/each}
	{/await}
</div>


