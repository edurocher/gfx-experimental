define([
	"dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/aspect",
	"dojo/dom",
	"dojo/on",
	"dojo/_base/Color",
	"gfx/canvas/Shape",
	"gfx/matrix"
], function(lang, declare, aspect, dom, on, Color, CanvasShape, m){
	return declare(CanvasShape, {

		createRawNode: function(){

			var listeners = {};

			return {
				shape: this,
				ownerDocument: null, // will be set in Container.add
				parentNode: null,    // will be set in Container.add
				addEventListener: function(type, listener){
					var listenersOfType = listeners[type] = (listeners[type] || []);
					for(var i = 0, record; (record = listenersOfType[i]); ++i){
						if(record.listener === listener){
							return;
						}
					}

					listenersOfType.push({
						listener: listener,
						handle: aspect.after(this, "on" + type, this.surface.fixTarget(listener), true)
					});
				},
				removeEventListener: function(type, listener){
					var listenersOfType = listeners[type];
					if(!listenersOfType){
						return;
					}
					for(var i = 0, record; (record = listenersOfType[i]); ++i){
						if(record.listener === listener){
							record.handle.remove();
							listenersOfType.splice(i, 1);
							return;
						}
					}
				}
			};
		},

		_testInputs: function(/* Object */ ctx, /* Array */ pos){
			if(this.clip || (!this.canvasFill && this.strokeStyle)){
				// pixel-based until a getStrokedPath-like api is available on the path
				this._hitTestPixel(ctx, pos);
			}else{
				this._renderShape(ctx);
				var length = pos.length,
					t = this.getTransform();

				for(var i = 0; i < length; ++i){
					var input = pos[i];
					// already hit
					if(input.target){continue;}
					var x = input.x,
						y = input.y,
						p = t ? m.multiplyPoint(m.invert(t), x, y) : { x: x, y: y };
					input.target = this._hitTestGeometry(ctx, p.x, p.y);
				}
			}
		},

		_hitTestPixel: function(/* Object */ ctx, /* Array */ pos){
			for(var i = 0; i < pos.length; ++i){
				var input = pos[i];
				if(input.target){continue;}
				var x = input.x,
					y = input.y;
				ctx.clearRect(0,0,1,1);
				ctx.save();
				ctx.translate(-x, -y);
				this._render(ctx, true);
				input.target = ctx.getImageData(0, 0, 1, 1).data[0] ? this : null;
				ctx.restore();
			}
		},

		_hitTestGeometry: function(ctx, x, y){
			return ctx.isPointInPath(x, y) ? this : null;
		},

		_renderFill: function(/* Object */ ctx, /* Boolean */ apply){
			// summary:
			//		render fill for the shape
			// ctx:
			//		a canvas context object
			// apply:
			//		whether ctx.fill() shall be called
			if(ctx.pickingMode){
				if("canvasFill" in this && apply){
					ctx.fill();
				}
				return;
			}
			this.inherited(arguments);
		},

		_renderStroke: function(/* Object */ ctx){
			// summary:
			//		render stroke for the shape
			// ctx:
			//		a canvas context object
			// apply:
			//		whether ctx.stroke() shall be called
			if(this.strokeStyle && ctx.pickingMode){
				var c = this.strokeStyle.color;
				try{
					this.strokeStyle.color = new Color(ctx.strokeStyle);
					this.inherited(arguments);
				}finally{
					this.strokeStyle.color = c;
				}
			}else{
				this.inherited(arguments);
			}
		},

		// events

		getEventSource: function(){
			return this.surface.rawNode;
		},

		on: function(type, listener){
			// summary:
			//		Connects an event to this shape.

			var expectedTarget = this.rawNode;

			// note that event listeners' targets are automatically fixed up in the canvas's addEventListener method
			return on(this.getEventSource(), type, function(event){
				if(dom.isDescendant(event.target, expectedTarget)){
					listener.apply(expectedTarget, arguments);
				}
			});
		},

		connect: function(name, object, method){
			// summary:
			//		Deprecated. Connects a handler to an event on this shape. Use `on` instead.

			if(name.substring(0, 2) == "on"){
				name = name.substring(2);
			}
			return this.on(name, method ? lang.hitch(object, method) : lang.hitch(null, object));
		},

		disconnect: function(handle){
			// summary:
			//		Deprecated. Disconnects an event handler. Use `handle.remove` instead.

			handle.remove();
		}
	});
});
