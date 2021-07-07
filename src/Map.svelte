<script>
  import { onMount, setContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  setContext(key, {
    getMap: () => map,
  });

  export let lat;
  export let lon;
  export let zoom;

  let container;
  let map;
  let mapStyle = "mapbox://styles/sanya3000/ckqtntxka54aj18mk5c18k7yg";

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";
    link.onload = () => {
      map = new mapbox.Map({
        container,
        center: [lon, lat],
        zoom,
      });

      map.setStyle(mapStyle);

      map.addControl(
        new mapbox.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
    };

    document.head.appendChild(link);
    document
      .getElementById("switch-style-button")
      .addEventListener("click", switchLayer);

    function switchLayer() {
      mapStyle =
        mapStyle === "mapbox://styles/sanya3000/ckqtntxka54aj18mk5c18k7yg"
          ? "mapbox://styles/sanya3000/ckqrm3ku416yl18nzjrjdkczd"
          : "mapbox://styles/sanya3000/ckqtntxka54aj18mk5c18k7yg";
      map.setStyle(mapStyle);
    }

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<div bind:this={container}>
  <button id="switch-style-button">Спутник</button>
  {#if map}
    <slot />
  {/if}
</div>

<style>
  button {
    position: absolute;
    z-index: 99;
    /* width: 40px; */
    height: 40px;
    border-radius: 14px;
    padding: 10px 20px;
    font-weight: 600;
    top: 16px;
    left: 16px;
    background: rgb(53, 195, 237);
    border: none;
    text-transform: uppercase;
  }
  div {
    max-width: 100%;
    height: 100%;
    max-height: calc(100vh - 40px);
  }
</style>
