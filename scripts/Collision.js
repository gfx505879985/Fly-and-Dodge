
var Collision = pc.createScript('collision');
Collision.attributes.add('explosion', { type: 'entity' });
// initialize code called once per entity
Collision.prototype.initialize = function() {
    this.player = this.app.root.findByName('Hovership');
    //this.explosion = this.app.root.findByName('explosion');
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

Collision.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.pos = this.entity.getPosition();
        this.entity.destroy();
        this.explode();
        this.app.fire('game:reset','random');
    }
};

Collision.prototype.explode = function ()
{
    var explosion = this.explosion.clone();
    explosion.enabled = true;
    explosion.name = 'newExplosion';
    this.app.root.addChild(explosion);
    
    explosion.rigidbody.teleport(this.pos);
};
// swap method called for script hot-reloading
// inherit your script state here
// Collision.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/