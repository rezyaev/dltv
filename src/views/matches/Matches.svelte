<script lang="ts">
	import { fetchMatches } from "./matches";
	import MatchGroups from "./MatchGroups.svelte";

	let tab = $state<"past" | "upcoming">("upcoming");
</script>

<div>
	<div class="tabs tabs-box mb-4">
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Матчи" bind:group={tab} value="upcoming" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Результаты" bind:group={tab} value="past" />
	</div>

	{#if tab === "upcoming"}
		{#await fetchMatches("running") then matches}
			{#if matches.length > 0}
				<MatchGroups {matches} live={true} showResults={true} />
			{/if}
		{/await}

		{#await fetchMatches("upcoming") then matches}
			<MatchGroups {matches} />
		{/await}
	{:else if tab === "past"}
		{#await fetchMatches("past") then matches}
			<MatchGroups {matches} showResults={true} />
		{/await}
	{/if}
</div>
