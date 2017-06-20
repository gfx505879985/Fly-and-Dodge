var Game = pc.createScript('game');
Game.attributes.add('model', { type: 'entity' });
// initialize code called once per entity
Game.prototype.initialize = function() {
    //add listener
    this.app.on('game:reset', function (x) {
        this.app.fire('camera:init');
        this.app.fire('ship:init');
        this.app.fire('spawner:init');
            },this);
};


// swap method called for script hot-reloading
// inherit your script state here
// Game.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/