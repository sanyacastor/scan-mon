<script type="ts">
  export let items: Ipoint[];
</script>

<div class="items">
  <h2>Важные точки</h2>
  <ul>
    {#each items as item, i}
      <li data-id={item.id}>
        <span>{i + 1}.{item.title}</span>
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
  h2 {
    padding-left: 8px;
    text-decoration: underline;
    text-transform: uppercase;
    text-align: center;
  }
  @media (max-width: 900px) {
    .items {
      height: auto;
      max-height: 60vh;
    }
  }
</style>
