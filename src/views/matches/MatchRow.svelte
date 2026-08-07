<script lang="ts">
	import { format } from "date-fns";
	import { type Match, type Team } from "./matches";

	let { match, live = false, showResults = false }: { match: Match, live?: boolean, showResults?: boolean } = $props();

	let score1 = $derived(match.results[0].score);
	let score2 = $derived(match.results[1].score);
</script>

<li class="list-row items-center gap-6">
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
		<div class="flex flex-col gap-2 font-bold">
			<span class={{ 'text-success': score1 > score2, 'text-error': score2 > score1  }}>{score1}</span>
			<span class={{ 'text-success': score2 > score1, 'text-error': score1 > score2  }}>{score2}</span>
		</div>
	{/if}
</li>

{#snippet TeamSnippet(team: Team)}
	<div class="gap-2 flex items-center">
		{#if team.dark_mode_image_url || team.image_url}
			<img class="h-4" alt="logo" src={team.dark_mode_image_url ?? team.image_url} />
		{/if}

		<span>{team.name}</span>
	</div>
{/snippet}
