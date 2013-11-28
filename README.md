gfx-experimental
================

This repository contains some experimental GFX features:
- the canvasWithEvents renderer, which extends the canvas renderer and adds event handling capabilities
- the svg_attach.js module, which allows to wrap an existing SVG hierarchy into GFX objects

These features are not fully supported and/or complete so we don't want to include them in GFX 2.0.
They can be used separately, by configuring the packages configuration option appropriately.

The provided test cases assume the code is placed next to dojo/dojox/dijit and gfx.
