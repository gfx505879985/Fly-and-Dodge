var Fly = pc.createScript('fly');
Fly.attributes.add('init_speed',{type: 'number'});
// initialize code called once per entity
Fly.prototype.initialize = function() {
    var initSpeed = new pc.Vec3(0,0,-1*this.init_speed);
    this.entity.rigidbody.linearVelocity.add(initSpeed);
    this.v = new pc.Vec3(0,0,-1*this.init_speed);
    this.app.on('camera:init', function (x) {
        this.entity.rigidbody.teleport(0,5,20);
        this.v = new pc.Vec3(0,0,-1*this.init_speed);
    },this);
                
};

// update code called every frame
Fly.prototype.update = function(dt) {
    this.acc = new pc.Vec3(0,0,-10*dt);
    if(this.v.z >= -300)
    {
    this.v.add(this.acc);
    }
    this.entity.rigidbody.linearVelocity = this.v;
};

// swap method called for script hot-reloading
// inherit your script state here
// Fly.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/