<script lang="ts">
	import { fetchMatches } from "./views/matches/matches";
	import Matches from "./views/matches/Matches.svelte";
	import Group from "./views/group/Group.svelte";

	let tab = $state<"upcoming" | "past" | "group">("upcoming");
</script>

<main class="bg-base-100 p-4">
	<div class="tabs tabs-box mb-4">
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Матчи" bind:group={tab} value="upcoming" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Результаты" bind:group={tab} value="past" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Группа" bind:group={tab} value="group" />
	</div>

	{#await fetchMatches() then matches}
		{#if tab === "upcoming"}
			{@const liveMatches = matches.filter((m) => m.status === "running")}
			{#if liveMatches.length > 0}
				<Matches matches={liveMatches} live={true} showResults={true} />
			{/if}

			<Matches matches={matches.filter((m) => m.status === "not_started" && m.opponents.length > 0)} />
		{:else if tab === "past"}
			<Matches matches={matches.filter((m) => m.status === "finished")} showResults={true} />
		{:else if tab === "group"}
			<Group />
		{/if}
	{/await}
</main>
