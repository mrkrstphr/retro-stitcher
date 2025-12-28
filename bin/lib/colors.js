import fs from 'fs';

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return hex.padStart(6, '0');
}

// Distance between 2 colors (in RGB)
// https://stackoverflow.com/questions/23990802/find-nearest-color-from-a-colors-list
function distance(a, b) {
  return Math.sqrt(Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}

// return nearest color from array
export function nearestColor(colorHex) {
  var lowest = Number.POSITIVE_INFINITY;
  var tmp;
  let index = 0;

  const dmcColors = JSON.parse(fs.readFileSync('./public/dmc.json').toString());

  const colorsAsArray = Object.values(dmcColors);

  colorsAsArray.forEach((el, i) => {
    tmp = distance(hexToRgb(colorHex), hexToRgb(el.hex));
    if (tmp < lowest) {
      lowest = tmp;
      index = i;
    }
  });
  return colorsAsArray[index];
}

export function hexToJimpColor(hex) {
  if (typeof hex === 'number') {
    return (hex << 8) | 0xff;
  }

  if (typeof hex !== 'string') {
    console.warn(`Invalid hex color type: ${typeof hex}`, hex);
    return 0x00000000;
  }

  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);

  return ((r << 24) | (g << 16) | (b << 8) | 0xff) >>> 0;
}
