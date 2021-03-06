function Controls() {
    this.type             = [];
    this.type.keyup       = 'keyup';
    this.type.keydown     = 'keydown';
    this.type.keypress    = 'keypress';

    this.type.click       = 'click';
    this.type.dblclick    = 'dblclick';
    this.type.mouseup     = 'mouseup';
    this.type.mousedown   = 'mousedown';
    this.type.mousemove   = 'mousemove';
    this.type.mouseout    = 'mouseout';

    this.type.touchstart  = 'touchstart';
    this.type.touchend    = 'touchend';
    this.type.touchmove   = 'touchmove';
    this.type.touchenter  = 'touchenter';
    this.type.touchleave  = 'touchleave';
    this.type.touchcancel = 'touchcancel';

    this.events           = [];

    this.mouse            = new Mouse();
    this.keyboard         = new Keyboard();

    this.init = function() {
        for(var type in this.type) {
            window.addEventListener(type, this.eventFired, true);
        }
    };

    // Add new function to be recorded and executed when event is fired.
    this.new = function(type, functionToExecute) {
        //TODO: refactor to not use push.
        this.events[type] === undefined && (this.events[type] = []);
        this.events[type].push(function(event) {
            functionToExecute(event);
        });
    };

    // Executes the functions assiocated with our event.
    this.eventFired = function(event) {
        var firedEvent = game.controls.events[event.type];

        if(firedEvent) {
            for(var i = 0; i < firedEvent.length; i++) {
                // if our function to execute is defined then execute that function for this event.
                firedEvent[i] && firedEvent[i](event);
            }
        }
    };

    this.init();
}

function Mouse() {
    this.x                = 0;
    this.y                = 0;
    this.height           = 0;
    this.width            = 0;

    this.downX            = 0;
    this.downY            = 0;
    this.upX              = 0;
    this.upY              = 0;

    this.drag             = false;
    this.clicked          = false;

    this.code             = [];
    this.code.leftButton  = 0;
    this.code.rightButton = 2;

    this.selection        = new MouseSelection();
}

function Keyboard() {
    this.code   = [];
    this.code.a = 65;
    this.code.s = 83;
}

function MouseSelection() {
    this.x         = 0;
    this.y         = 0;
    this.height    = 0;
    this.width     = 0;

    this.lineWidth = 1;
    this.color     = 'rgba(255, 255, 255, 0.5)';

    this.check = function(items) {
        for(var key in items) {
            var item = items[key];

            if(game.collisions.isColliding(this, item)) {
                item.select();
            }
        }
    };

    this.setDimensions = function() {
        var mouse = game.controls.mouse;

        if (mouse.downX > mouse.x) {
            mouse.selection.x      = mouse.x;
            mouse.selection.width  = mouse.downX - mouse.x;
        } else {
            mouse.selection.x      = mouse.downX;
            mouse.selection.width  = mouse.x - mouse.downX;
        }

        if (mouse.downY > mouse.y) {
            mouse.selection.y      = mouse.y;
            mouse.selection.height = mouse.downY - mouse.y;
        } else {
            mouse.selection.y      = mouse.downY;
            mouse.selection.height = mouse.y - mouse.downY;
        }
    };

    this.draw = function() {
        var selection = game.controls.mouse.selection;

        game.foreground.context.fillStyle   = 'rgba(0, 0, 0, 0.0)';
        game.foreground.context.strokeStyle = this.color;
        game.foreground.context.lineWidth   = this.lineWidth;

        game.foreground.context.strokeRect(selection.x, selection.y, selection.width, selection.height);
    };

    this.render = function() {};
}