<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";
  import { mapBoxInstance } from "./store";

  const { getMap } = getContext(key);
  const map = getMap();
  mapBoxInstance.set(map);

  export let lat;
  export let lon;
  export let id;
  export let point;
  export let label;

  const popup = new mapbox.Popup({ offset: 25 }).setHTML(
    `<b>${label}</b><br/>S/N: ${id}`
  );

  const marker = new mapbox.Marker(point)
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>
