<script lang="ts">
  import Map from "./Map.svelte";
  import List from "./List.svelte";
  import Header from "./Header.svelte";
  import MapMarker from "./MapMarker.svelte";
  import { points } from "./points";
</script>

<main>
  <section class="container">
    <Header />
    <List items={points} />
    <Map lat={56.26} lon={84.97} zoom={10}>
      {#each points as point}
        <MapMarker
          lat={point.lat}
          lon={point.lon}
          label={point.title}
          icon={point.icon}
          id={point.id}
        />
      {/each}
    </Map>
  </section>
</main>

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
    max-height: 100vh;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 40px 1fr;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  @media (max-width: 900px) {
    .container {
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr 1fr;
    }
  }
</style>
