// helper.js
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const cldBase = `https://res.cloudinary.com/${CLOUD}/image/upload`;

function toAr(aspect) {
  // Accept "W:H" (e.g. "4:3") or fall back to "5:7"
  if (typeof aspect === "string" && /^\d+:\d+$/.test(aspect)) {
    return `ar_${aspect}`;
  }
  if (aspect === "1:1") return "ar_1:1";
  if (aspect === "5:7") return "ar_5:7";
  return "ar_5:7";
}

export function cldUrl(id, { width = 720, aspect = "5:7" } = {}) {
  const ar = toAr(aspect);
  const t = `f_auto,q_auto,dpr_auto,c_fill,g_auto,${ar},w_${width}`;
  return `${cldBase}/${t}/${id}`;
}

export function buildSrcSet(id, aspect = "5:7", widths = [360, 720, 1080]) {
  return widths.map(w => `${cldUrl(id, { width: w, aspect })} ${w}w`).join(", ");
}
