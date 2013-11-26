define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Line"
], function(declare, CanvasWithEventsShape, CanvasLine){
	return declare([CanvasWithEventsShape, CanvasLine], {});
});
