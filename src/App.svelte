<script>
  import faunadb, { query as q } from "faunadb";

  import Map from "./Map.svelte";
  import List from "./List.svelte";
  import Header from "./Header.svelte";
  import MapMarker from "./MapMarker.svelte";

  let points = [];

  const fetchItems = (async () => {
    const adminClient = new faunadb.Client({
      secret: __myapp.env.FAUNADB_SECRET,
      domain: "db.eu.fauna.com",
    });

    return adminClient
      .query(q.Get(q.Ref(q.Collection("points"), "372394788336435404")))
      .then((res) => {
        const points = [];

        Object.keys(res.data.points).map((p) =>
          points.push({ ...res.data.points[p], id: p })
        );

        const sortedBydate = points.sort(function (a, b) {
          return new Date(b.time) - new Date(a.time);
        });

        let elements = [];

        sortedBydate.forEach((e) => {
          const el = document.createElement("div");
          el.dataset.marker = e.id;
          el.className = "marker-wrapper";
          el.innerHTML = `<div class="marker"></div>`;
          elements = [...elements, el];
        });

        return {
          sortedPoints: sortedBydate,
          elements,
        };
      })
      .catch((err) =>
        console.error(
          "Error: [%s] %s: %s",
          err.name,
          err.message,
          err.errors()[0].description
        )
      );
  })();
</script>

<main>
  <section class="container">
    {#await fetchItems}
      <div class="loader"><span>loading...</span></div>
    {:then data}
      <Header />
      <List items={data.sortedPoints} markers={data.elements} />
      <Map lat={40.4165} lon={-3.70256} zoom={5}>
        {#each data.sortedPoints as item, i}
          <MapMarker
            lat={item.latitude}
            lon={item.longitude}
            label={item.machine}
            point={data.elements[i]}
            id={item.id}
          />
        {/each}
      </Map>
    {:catch error}
      <p>Error occurred!</p>
    {/await}
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

  .loader {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
