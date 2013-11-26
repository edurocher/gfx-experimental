define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Ellipse"
], function(declare, CanvasWithEventsShape, CanvasEllipse){
	return declare([CanvasWithEventsShape, CanvasEllipse], {});
});
