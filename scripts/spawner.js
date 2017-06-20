var Spawner = pc.createScript('spawner');
Spawner.attributes.add('model', { type: 'entity' });
// initialize code called once per entity
Spawner.prototype.initialize = function() {
    this.camera = this.app.root.findByName('GameCamera');
    this.timer = 2;
    this.time = 2;
    this.spawnedNum = 0;
    this.counter = 1;
    this.app.on('spawner:init', function (x) {
        this.clearAll();
        this.timer = 2;
        this.time = 2;
        this.spawnedNum = 0;
        this.counter = 1;
    },this);
    
};

// update code called every frame
Spawner.prototype.update = function(dt) {

    if(this.time >= this.timer)
    {    
        var i = 0;
        //setup desending time
        if (this.timer > 0.2)
        {this.timer = this.timer - 0.5*dt;}
        for(i = 0;i<this.counter;i++)
        {
        var x = Math.random()*30-12.5;
        var y = Math.random()*20-5.5;
        var z = this.camera.getPosition().z-150-20;
        this.spawn(x,y,z);
        }
        this.relax();
        this.time = 0;
        ++this.spawnedNum;
        this.counter = Math.floor(Math.sqrt(this.spawnedNum));
    }
    this.time = this.time + dt;
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

Spawner.prototype.clearAll = function()
{
    var flag= true;
    newEntity = this.app.root.findByName('newEntity');
    while(newEntity !== null){
    newEntity.destroy();
    newEntity = this.app.root.findByName('newEntity');
    }

};
// swap method called for script hot-reloading
// inherit your script state here
// Spawner.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/