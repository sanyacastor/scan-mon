<script>
    export let items;
    export let search = "";
    export let filtredItems = items;
</script>

<style>
    ul {
        box-sizing: border-box;
        list-style: none;
        width: 100%;
        padding: 0;
        margin: 0;
    }
    li {
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
        padding: 16px;
        border-bottom: 1px solid rgb(212, 212, 212);
    }
    h2 {
        padding-left: 8px;
        text-decoration: underline;
        text-transform: uppercase;
    }
</style>

<div class="items">
    <label class="search-wrapper">
        <input
            type="text"
            class="search"
            placeholder="search"
            on:input={(e) => (filtredItems = items.filter((i) =>
                    i[0]
                        .toLowerCase()
                        .includes(e.target.value.trim().toLowerCase())
                ))}
            bind:value={search} />
    </label>
    <h2>Tracking</h2>
    <ul>
        {#each filtredItems as item}
            <li data-id={item[0]}>
                <span>🤖 {item[0]}</span>
                <span>📆
                    {item[1].split('/').join('.').split(' ')[0]}</span><span>🌎
                    LON:{item[3].split('.')[0]}, LAT:{item[4].split('.')[0]}</span>
            </li>
        {/each}
    </ul>
</div>
