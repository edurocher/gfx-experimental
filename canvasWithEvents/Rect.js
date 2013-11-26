define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Rect"
], function(declare, CanvasWithEventsShape, CanvasRect){
	return declare([CanvasWithEventsShape, CanvasRect], {});
});
