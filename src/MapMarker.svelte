<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let id;
  export let point;
  export let points;
  export let label;

  document.querySelector(`[data-id='${id}'`).addEventListener("click", () => {
    map.flyTo({
      center: [lon, lat],
      essential: true
    });

    points.forEach((p) => {
      p.classList.remove("marker--highlighted");
    });
    point.classList.add("marker--highlighted");
  });

  const popup = new mapbox.Popup({ offset: 25 }).setHTML(
    `<b>${label}</b><br/>S/N: ${id}`
  );
  const marker = new mapbox.Marker(point)
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>
