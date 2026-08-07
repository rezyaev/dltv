<script lang="ts">
	import UpcomingMatches from "./UpcomingMatches.svelte";

	let tab = $state<"past" | "upcoming">("upcoming");
</script>

<div>
	<div class="tabs tabs-box mb-4">
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Матчи" bind:group={tab} value="upcoming" />
		<input type="radio" name="my_tabs_1" class="tab flex-1" aria-label="Результаты" bind:group={tab} value="past" />
	</div>

	<UpcomingMatches />
</div>


