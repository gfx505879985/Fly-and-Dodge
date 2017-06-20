var Keyboard = pc.createScript('keyboard');
Keyboard.attributes.add('speed', {
    type: 'number',
    default: 10
});
Keyboard.attributes.add('player', { type: 'entity' });
// initialize code called once per entity
Keyboard.prototype.initialize = function() {
    //clone
    this.ship = this.player.clone();
    this.ship.name = "newShip";
    this.app.root.addChild(this.ship);
    this.ship.enabled = true;
    this.ship.rigidbody.teleport(pc.Vec3.ZERO);
    
    
    this.up = new pc.Vec3(0,1,0);
    this.down = new pc.Vec3(0,-1,0);
    this.left = new pc.Vec3(-1,0,0);
    this.right = new pc.Vec3(1,0,0);
    var initSpeed = new pc.Vec3(0,0,-1*this.speed);
    //this.ship.rigidbody.linearVelocity = initSpeed;
    //this.hitbox.rigidbody.linearVelocity= initSpeed; 
    this.acc = new pc.Vec3();
    this.currentSpeed = -1*this.speed;
    this.current = this.ship.getPosition();
    this.addingSpeed = new pc.Vec3(0,0,0);
    
    
    //listener on
    this.app.on('ship:init', function (x) {
        this.ship = this.player.clone();
    this.ship.name = "newShip";
    this.app.root.addChild(this.ship);
    this.ship.enabled = true;
    this.ship.rigidbody.teleport(pc.Vec3.ZERO);
    
    this.up = new pc.Vec3(0,1,0);
    this.down = new pc.Vec3(0,-1,0);
    this.left = new pc.Vec3(-1,0,0);
    this.right = new pc.Vec3(1,0,0);
    var initSpeed = new pc.Vec3(0,0,-1*this.speed);
    //this.ship.rigidbody.linearVelocity = initSpeed;
    //this.hitbox.rigidbody.linearVelocity= initSpeed; 
    this.acc = new pc.Vec3();
    this.currentSpeed = -1*this.speed;
    this.current = this.ship.getPosition();
    this.addingSpeed = new pc.Vec3(0,0,0);
    },this);
                
};

// update code called every frame
Keyboard.prototype.update = function(dt) {
    this.current = this.ship.getPosition();
    if(this.addingSpeed.z>= -300)
    {
    this.addingSpeed.add(new pc.Vec3(0,0,this.currentSpeed*dt));
    }
    
    this.v = new pc.Vec3(0,0,0);
    if(this.app.keyboard.isPressed(pc.input.KEY_RIGHT))
        if(!(this.current.x>12))
            this.v.add(this.right);
    if(this.app.keyboard.isPressed(pc.input.KEY_UP))
        if(!(this.current.y>11))
            this.v.add(this.up);
    if(this.app.keyboard.isPressed(pc.input.KEY_LEFT))
        if(!(this.current.x<-12))
            this.v.add(this.left);
    if(this.app.keyboard.isPressed(pc.input.KEY_DOWN))
        if(!(this.current.y<-1))
            this.v.add(this.down);
    this.v = this.v.normalize().scale(20);
    this.v.add(this.addingSpeed);
    
    
    this.ship.rigidbody.linearVelocity = this.v;
    
   
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