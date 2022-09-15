<script>
  import dayjs from "dayjs";
  import { mapBoxInstance } from "./store";

  export let items;
  export let search = "";
  export let filtredItems = items;
  export let markers;

  let map;

  mapBoxInstance.subscribe((value) => {
    map = value;
  });

  export let hilightMarker = (id) => {
    markers.forEach((p) => {
      p.classList.remove("marker--highlighted");
    });
    document
      .querySelector(`[data-marker="${id}"]`)
      .classList.add("marker--highlighted");
  };
</script>

<div class="items">
  <label class="search-wrapper">
    <input
      type="text"
      class="search"
      placeholder="search"
      on:input={(e) =>
        (filtredItems = items.filter((point) =>
          point.machine
            .toLowerCase()
            .includes(e.target.value.trim().toLowerCase())
        ))}
      bind:value={search}
    />
  </label>
  <h2>Tracking list</h2>
  <ul>
    {#each filtredItems as item, i}
      <li
        data-point-id={item.id}
        on:click={() => {
          map.flyTo({
            center: [item.longitude, item.latitude],
            essential: true,
          });
          hilightMarker(item.id);
        }}
      >
        <span>{i + 1}.{item.machine}</span>
        <span style="padding-right: 8px">
          {dayjs(item.time).format("DD-MM-YYYY | HH:mm")}
        </span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .items {
    box-sizing: border-box;
    height: calc(100vh - 40px);
    display: grid;
    grid-template-rows: auto auto 1fr;
    grid-column: 0/1;
  }
  ul {
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: auto;
    grid-row-start: 3/4;
  }
  li {
    box-sizing: border-box;
    margin: 0;
    padding: 16px 8px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgb(212, 212, 212);
    cursor: pointer;
    transition: all 300ms ease;
  }
  li:last-of-type {
    border-bottom: 1px solid rgb(212, 212, 212);
  }
  li:hover {
    background: rgb(98, 30, 153);
    color: #fff;
  }
  .search {
    width: 100%;
    padding-left: 36px;
  }
  .search-wrapper:before {
    content: "🔎";
    position: absolute;
    padding-top: 4px;
    padding-left: 12px;
    line-height: 1.6;
  }
  .search-wrapper {
    position: relative;
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid rgb(212, 212, 212);
  }
  h2 {
    padding-left: 8px;
    text-decoration: underline;
    text-transform: uppercase;
    text-align: center;
  }

  @media (max-width: 900px) {
    .items {
      height: 50vh;
    }
    h2 {
      font-size: 14px;
    }
    .search {
      font-size: 24px;
      margin-bottom: 0;
      padding-left: 50px;

    }
    .search-wrapper {
      padding: 4px;
    }
    .search-wrapper:before {
      font-size: 24px;
      line-height: 1.6;
      left: 12px;
    }
  }
</style>
