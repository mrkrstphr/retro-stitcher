import fs from 'fs';

function getRGB(c) {
  return parseInt(c, 16) || c;
}

function getsRGB(c) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f, b) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export function getTextColor(bgColor) {
  const whiteContrast = getContrast(bgColor, '#ffffff');
  const blackContrast = getContrast(bgColor, '#000000');

  return whiteContrast > blackContrast ? '#ffffff' : '#000000';
}

function hexToRgb(hex) {
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
