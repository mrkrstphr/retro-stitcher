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
