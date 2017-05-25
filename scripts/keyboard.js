var Keyboard = pc.createScript('keyboard');
Keyboard.attributes.add('speed', {
    type: 'number',
    default: 10
});

// initialize code called once per entity
Keyboard.prototype.initialize = function() {
    this.up = new pc.Vec3(0,1,0);
    this.down = new pc.Vec3(0,-1,0);
    this.left = new pc.Vec3(-1,0,0);
    this.right = new pc.Vec3(1,0,0);
    this.hitbox = this.app.root.findByName('hitbox');
    this.camera = this.app.root.findByName('GameCamera');
    var initSpeed = new pc.Vec3(0,0,-5);
    this.entity.rigidbody.linearVelocity.add(initSpeed);
    this.hitbox.rigidbody.linearVelocity.add(initSpeed);
    this.acc = new pc.Vec3();
    this.currentSpeed = -5;
    this.current = this.entity.getPosition();
};

// update code called every frame
Keyboard.prototype.update = function(dt) {
    this.currentSpeed = this.currentSpeed-dt;
    this.acc = new pc.Vec3(0,0,this.currentSpeed);
    var v = new pc.Vec3(0,0,0);//this.entity.rigidbody.linearVelocity.z
    var stop = new pc.Vec3(0,0,0);
    if(this.app.keyboard.isPressed(pc.input.KEY_RIGHT))
        if(!(this.current.x>12))
            v.add(this.right);
    if(this.app.keyboard.isPressed(pc.input.KEY_UP))
        if(!(this.current.y>11))
            v.add(this.up);
    if(this.app.keyboard.isPressed(pc.input.KEY_LEFT))
        if(!(this.current.x<-12))
            v.add(this.left);
    if(this.app.keyboard.isPressed(pc.input.KEY_DOWN))
        if(!(this.current.y<-1))
            v.add(this.down);
    v = v.normalize().scale(this.speed);
    v.add(this.acc);
    //stop.add(this.acc);
    this.entity.rigidbody.linearVelocity = v;
    this.hitbox.rigidbody.linearVelocity = v;
    /*
    if(this.current.x>13)
    {
    stop.add(this.left.clone().scale(this.speed));
    this.entity.rigidbody.linearVelocity = stop;
    this.hitbox.rigidbody.linearVelocity = stop;
    }
    if(this.current.x<-13)
    {
    stop.add(this.right.clone().scale(this.speed));
    this.entity.rigidbody.linearVelocity = stop;
    this.hitbox.rigidbody.linearVelocity = stop;
    }
    if(this.current.y>7)
     {
    stop.add(this.down.clone().scale(this.speed));
    this.entity.rigidbody.linearVelocity = stop;
    this.hitbox.rigidbody.linearVelocity = stop;
     }
    if(this.current.y<-7)
    {
    stop.add(this.up.clone().scale(this.speed));
    this.entity.rigidbody.linearVelocity = stop;
    this.hitbox.rigidbody.linearVelocity = stop;
    }
    */
};

// swap method called for script hot-reloading
// inherit your script state here
// Test.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/