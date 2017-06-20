var Asteroid = pc.createScript('asteroid');

// initialize code called once per entity
Asteroid.prototype.initialize = function() {
    
    this.camera = this.app.root.findByName('GameCamera');
};

// update code called every frame
Asteroid.prototype.update = function(dt) {
    this.relax();
};

Asteroid.prototype.relax = function()
{
    if(this.entity.getPosition().z>=(this.camera.getPosition().z-15))
        this.entity.destroy();

        
};
// swap method called for script hot-reloading
// inherit your script state here
// Asteroid.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/