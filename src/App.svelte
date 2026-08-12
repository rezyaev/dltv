<script lang="ts">
	import { fetchMatches } from "./views/matches/matches";
	import Matches from "./views/matches/Matches.svelte";

	let tab = $state<"upcoming" | "past" | "group">("upcoming");
</script>

<main class="w-full h-full bg-base-100 p-4">
	<div class="tabs tabs-box mb-4">
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Матчи" bind:group={tab} value="upcoming" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Результаты" bind:group={tab} value="past" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Группа" bind:group={tab} value="group" />
	</div>

	{#if tab === "upcoming"}
		{#await fetchMatches("running") then matches}
			{#if matches.length > 0}
				<Matches {matches} live={true} showResults={true} />
			{/if}
		{/await}

		{#await fetchMatches("upcoming") then matches}
			<Matches {matches} />
		{/await}
	{:else if tab === "past"}
		{#await fetchMatches("past") then matches}
			<Matches {matches} showResults={true} />
		{/await}
	{:else if tab === "group"}
		group
	{/if}
</main>
