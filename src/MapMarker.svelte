<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;
  export let id;

  const popup = new mapbox.Popup({ offset: 25 }).setText(label);
  document
    .querySelector(`[data-id='${id}'`)
    .addEventListener("click", () => {
      map.flyTo({
        center: [lon, lat],
        essential: true,
      });
    });
  const marker = new mapbox.Marker()
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>
