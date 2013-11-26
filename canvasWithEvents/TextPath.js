define([
	"dojo/_base/declare",
	"./Shape",
	"gfx/canvas/TextPath"
], function(declare, CanvasWithEventsShape, CanvasTextPath){
	return declare([CanvasWithEventsShape, CanvasTextPath], {});
});
