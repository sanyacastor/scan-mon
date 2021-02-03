<script>
  // @ts-check
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";

  import Map from "./Map.svelte";
  import List from "./List.svelte";
  import Header from "./Header.svelte";
  import MapMarker from "./MapMarker.svelte";

  dayjs.extend(customParseFormat);

  const fetchItems = (async () => {
    const response = await fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/1aAgF1OvlDSBYhkw5keCutXeMM6T2Vzpw0P1uYdIIeJE/values/Sheet1!A1:E1000?key=AIzaSyC-UMHJ9ffwcgsA5u3Qm8xd5pcXPMYU4Wo"
    );
    const data = await response.json();
    let uniqItems = [];
    let uniqIds = new Set();
    let items = data.values.slice(1);
    items.forEach((item) => uniqIds.add(item[2]));

    const getDate = (str) => dayjs(str);
    //   `${str.split(" ")[0].split("/")[2]}-${str.split(" ")[0].split("/")[1]}-
    //  ${str.split(" ")[0].split("/")[0]}T${str.split(" ")[1]}:00`;

    uniqIds.forEach((u) => {
      const sameId = items.filter((item) => item[2] == u);
      let last = sameId[0];
      for (let i = 0; i < sameId.length; i++) {
        const current = sameId[i];
        console.log("@@", getDate(current[1]));
        if (getDate(current[1]) > getDate(last[1])) {
          last = current;
        }
      }
      uniqItems.push(last);
    });

    return uniqItems;
  })();
</script>

<main>
  <section class="container">
    {#await fetchItems}
      <div class="loader"><span>loading...</span></div>
    {:then data}
      <Header />
      <List items={data} />
      <Map lat={40.4165} lon={-3.70256} zoom={5}>
        {#each data as item}
          <MapMarker lat={item[3]} lon={item[4]} label={item[2]} />
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
