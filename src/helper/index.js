// helper.js
const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const cldBase = `https://res.cloudinary.com/${CLOUD}/image/upload`;

export function cldUrl(id, { width, aspect } = {}) {
  const w = Number(width) || 720;                 // default width
  const ar = aspect === "1:1" ? "ar_1:1" : "ar_5:7";
  const t = `f_auto,q_auto,c_fill,g_auto,${ar},w_${w}`;
  return `${cldBase}/${t}/${id}`;
}

export function buildSrcSet(id, aspect, widths = [360, 720, 1080]) {
  return widths.map(w => `${cldUrl(id, { width: w, aspect })} ${w}w`).join(", ");
}
