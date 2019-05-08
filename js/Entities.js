/* eslint-env es6 */
/* eslint-disable */

class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this,0);
        this.setData("type", type);
        this.setData("isDead",false); //maybe not important
        
        
    }
}

class Player extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, "Player");
        this.setData("speed", 200); // dictates the speed the player moves. 
        //this.play("rocketman");
    }
    create(){
        this.setCollideWorldBounds(true);
    }
    moveUp() {
            this.body.velocity.y = -this.getData("speed");
        }

    moveDown() {
            this.body.velocity.y = this.getData("speed");
        }

    moveLeft() {
            this.body.velocity.x = -this.getData("speed");
        }

    moveRight() {
            this.body.velocity.x = this.getData("speed");
        }

    update(){
        this.body.setVelocity(0, 0);
        //this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        //this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    }
        
    
}

class Rock extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'Rock');
        this.body.velocity.x = -Phaser.Math.Between(60,100);
     }
    //update(){
    //    this.setVelocityX(-100);
    //}
}

class GemI extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'GemI');
        this.body.velocity.x = -Phaser.Math.Between( 50, 80);
    }
}

class GemII extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'GemII');
        this.body.velocity.x = -Phaser.Math.Between( 50,80);
    }
}