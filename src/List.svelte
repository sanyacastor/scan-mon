<script>
  export let items;
  export let search = "";
  export let filtredItems = items;
</script>

<div class="items">
  <label class="search-wrapper">
    <input
      type="text"
      class="search"
      placeholder="search"
      on:input={(e) =>
        (filtredItems = items.filter((i) =>
          i[2].toLowerCase().includes(e.target.value.trim().toLowerCase())
        ))}
      bind:value={search}
    />
  </label>
  <h2>Tracking list</h2>
  <ul>
    {#each filtredItems as item, i}
      <li data-id={item[2]}>
        <span>{i}.🤖 {item[2]}</span>
        <span style="padding-right: 8px"
          >📆
          {new Date(
            `${item[1].split(" ")[0].split("/")[2]}-${
              item[1].split(" ")[0].split("/")[1]
            }-${item[1].split(" ")[0].split("/")[0]}T${
              item[1].split(" ")[1]
            }:00`
          ).toLocaleString()}</span
        >
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
  }
  .search-wrapper {
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
</style>
