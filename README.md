# retro-stitcher

## Generating Pattern Files

Generate from an image:

```
node bin/convertImageToCrossStitch.js raw/pixel-guy.png \
    > public/patterns/xyz/pixel-guy/pixel-guy-run-01.json
```

To generate a symbol map to keep symbols consistent across related sprite sheets, generate a color map:

```
node bin/generateColorMap.js raw/pixel-guy.png > pixel-guy-map.json
```

Then use it when converting images:

```
node bin/convertImageToCrossStitch.js \
    --symbolMap pixel-guy-symbols.json \
    raw/pixel-guy.png \
    > public/patterns/xyz/pixel-guy/pixel-guy-run-01.json
```

Include a title and source:

```
node bin/convertImageToCrossStitch.js \
    --source "https://www.spriters-resource.com/xyz" \
    --title "Pixel Guy, Run" \
    --symbolMap pixel-guy-symbols.json \
    raw/pixel-guy.png \
    > public/patterns/xyz/pixel-guy/pixel-guy-run-01.json
```

## Scripts

#### `bin/generateColorMap.js`

Takes an image and generates a color map of all the colors and assigns symbols. This can then be passed to `bin/convertImageToCrossStitch.js` to keep similar sprites using the same colors and symbols per color.

```
node bin/generateColorMap.js pattern.json > colors.json
```

#### `bin/flip.js`

Flips a pattern horizontally, saves it in place:

```
node bin/flip.js pattern.json
```

### `bin/patternToPixels.js`

Generates an image of a pattern, pixel by pixel. This will be the translated DMC color (source color -> Closest DMC -> Hex Representation), not the actual pixel colors from the source image:

```
node bin/patternToPixels.js pattern.json --output image.png
```

#### `bin/patternToThumbnail.js`

Generates an svg of what the pattern might look like, with each stitch being 4x4 pixels and grid lines. This is used to generate thumbnails for spritesheets:

```
node bin/patternToThumbnail.js pattern.json --output image.svg
```
