// utils/colorUtils.js
export const lightenColor = (color, percent) => {
    const num = parseInt(color.slice(1), 16);
    const r = Math.min(255, Math.round(((num >> 16) + (255 - (num >> 16)) * percent)));

    const g = Math.min(255, Math.round((((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * percent)));

    const b = Math.min(255, Math.round((((num & 0x0000FF) + (255 - (num & 0x0000FF)) * percent))));
  
    return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };
  