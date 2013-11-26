define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Polyline"
], function(declare, CanvasWithEventsShape, CanvasPolyline){
	return declare([CanvasWithEventsShape, CanvasPolyline], {});
});
