
var Collision = pc.createScript('collision');
Collision.attributes.add('model', { type: 'entity' });

// initialize code called once per entity
Collision.prototype.initialize = function() {
    this.player = this.app.root.findByName('Hovership');
    this.explosion = this.app.root.findByName('explosion');
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

Collision.prototype.onCollisionStart = function (result) {
    if (result.other.rigidbody) {
        this.pos = this.player.getPosition();
        this.player.enabled = false;
        this.explode();
    }
};

Collision.prototype.explode = function ()
{
    this.explosion.enabled = true;
    this.explosion.rigidbody.teleport(this.pos);
};
// swap method called for script hot-reloading
// inherit your script state here
// Collision.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/