<script lang="ts">
	import type { Match } from "../matches/matches";
	import { extractGroup, ROUNDS } from "./group";

	let { matches }: { matches: Match[] } = $props();
</script>

<div class="flex gap-8">
	{#each ROUNDS as round}
		<div class="list bg-base-300 rounded-xl">
			{#each round as match}
				<div class="list-row">
					{@render EmptyMatch()}
				</div>
			{/each}
		</div>
	{/each}
</div>

{#snippet EmptyMatch()}
	<span>?</span>
	<span>vs</span>
	<span>?</span>
{/snippet}
