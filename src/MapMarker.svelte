<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;
  export let icon;
  export let id;

  const popup = new mapbox.Popup({ offset: 25 }).setText(label);
  const el = document.createElement("div");

  el.className = "textMarker";
  el.style.display = "block";
  el.style.width = "40px";
  el.style.height = "40px";
  el.style.background = `url(icons/${icon})`;
  el.style.backgroundSize = "30px";
  el.style.backgroundPosition = "center";
  el.style.backgroundRepeat = "no-repeat";
  el.style.backgroundColor = "white";
  el.style.borderRadius = "50%";

  document.querySelector(`[data-id='${id}'`).addEventListener("click", () => {
    map.flyTo({
      center: [lon, lat],
      essential: true,
    });
  });

  const marker = new mapbox.Marker(el)
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>