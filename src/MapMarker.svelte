<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;
  export let icon;

  const popup = new mapbox.Popup({ offset: 25 }).setText(label);

  const el = document.createElement("div");
  el.className = "textMarker";
  el.style.display = "block";
  el.style.width = "50px";
  el.style.height = "50px";
  el.style.background = `url(icons/${icon})`;
  el.style.backgroundSize = "50px";
  el.style.backgroundRepeat = "no-repeat";

  // el.addEventListener("click", function () {
  //   window.alert(marker.properties.message);
  // });

  const marker = new mapbox.Marker(el)
    .setLngLat([lon, lat])
    .setPopup(popup)
    .addTo(map);
</script>
