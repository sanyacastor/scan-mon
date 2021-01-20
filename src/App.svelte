<script>
	import Map from "./Map.svelte";
	import List from "./List.svelte";
	import Header from "./Header.svelte";
	import MapMarker from "./MapMarker.svelte";

	const fetchItems = (async () => {
		const response = await fetch(
			"https://sheets.googleapis.com/v4/spreadsheets/1aAgF1OvlDSBYhkw5keCutXeMM6T2Vzpw0P1uYdIIeJE/values/Sheet1!A1:E5?key=AIzaSyC-UMHJ9ffwcgsA5u3Qm8xd5pcXPMYU4Wo"
		);
		const data = await response.json();
		return await data.values.slice(1);
	})();
</script>

<style>
	main {
		padding: 0;
		width: 100%;
		height: 100vh;
		box-sizing: border-box;
	}

	.container {
		display: grid;
		width: 100%;
		height: 100vh;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 40px 1fr;
	}

	.loader {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* .list {
		grid-column-start: 0;
		grid-column-end: 1;
	} */

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<section class="container">
		{#await fetchItems}
			<div class="loader"><span>loading...</span></div>
		{:then data}
			<Header />
			<List class="list" items={data} />
			<Map lat={data[0][3]} lon={data[0][4]} zoom={15}>
				{#each data as item}
					<MapMarker lat={item[3]} lon={item[4]} label={item[0]} />
				{/each}
			</Map>
		{:catch error}
			<p>An error occurred!</p>
		{/await}
	</section>
</main>
