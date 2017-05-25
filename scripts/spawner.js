var Spawner = pc.createScript('spawner');
Spawner.attributes.add('model', { type: 'entity' });
// initialize code called once per entity
Spawner.prototype.initialize = function() {
    this.player = this.app.root.findByName('Hovership');
    this.camera = this.app.root.findByName('GameCamera');
    this.timer = 0;
};

// update code called every frame
Spawner.prototype.update = function(dt) {
    this.timer -= dt;
    if(this.timer <=0)
    {
        this.timer = Math.random();
        var x = Math.random()*25-12.5;
        var y = Math.random()*13-5.5;
        var z = this.player.getPosition().z-Math.random()*20-150;
        this.spawn(x,y,z);
        this.relax();
        //alert(x+', '+y+', '+z+',');
    }
};

Spawner.prototype.spawn = function(x,y,z){
    // Create an asteroid at (x,y) drifcting towards (direction) with (speed) 
    var asteroid = this.model.clone();
    asteroid.name = "newEntity";
    
    this.app.root.addChild(asteroid);
    
    asteroid.enabled = true;
    asteroid.rigidbody.teleport( new pc.Vec3(x,y,z));
    return asteroid;
};

Spawner.prototype.relax = function()
{
    newEntity = this.app.root.findByName('newEntity');
    if(newEntity.getPosition().z>=this.camera.getPosition().z)
        newEntity.destroy();
};
// swap method called for script hot-reloading
// inherit your script state here
// Spawner.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/