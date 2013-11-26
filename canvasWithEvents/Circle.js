define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Circle"
], function(declare, CanvasWithEventsShape, CanvasCircle){
	return declare([CanvasWithEventsShape, CanvasCircle], {});
});
