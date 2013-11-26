define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/Path"
], function(declare, CanvasWithEventsShape, CanvasPath){
	return declare([CanvasWithEventsShape, CanvasPath], {});
});
