/* eslint-env es6 */
/* eslint-disable */

class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this,0);
        this.setData("type", type);
        this.setData("isDead",false);
        
    }
    explode(canDestroy){
        if(!this.getData("isDead")){
            this.setTexture("sprExplosion");
            this.anims.play("sprExplosion");
            
            //add sounds
        }
        this.on('animationcomplete', function(){
            if(canDestroy){
                this.destroy();
            }
            else{
                this.setVisible(false);
            }
        }, this);
        this.setData("isDead", true);
    };
    
}

class Player extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, "Player");
        this.setData("speed", 200); 
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 20);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
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
        this.x = Phaser.Math.Clamp(this.x, 40, 360);
        this.y = Phaser.Math.Clamp(this.y, 25, 475);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
        else { // when the "manual timer" is triggered:
            var laser = new Fire(this.scene, this.x+40, this.y+8);
            this.scene.playerFireBeams.add(laser);
            this.scene.laser_bar.update(-5);
            //this.scene.sfx.laser.play(); // play the laser sound effect
            this.setData("timerShootTick", 0);
            
            }
        }
    }
    
    onDestroy(canHurt){
        if(canHurt){
            this.scene.health_bar.update(-10);
        }
        if(this.scene.health_bar.health<= 0){
            this.scene.player.setTint(0xffff);
            this.scene.physics.pause();
            
            this.scene.player.setData("isDead", true);
            this.scene.time.addEvent({
                delay:1000,
                callback : function(){
                    this.scene.scene.start('SceneGameOver');
                },
                callbackScope:this,
                loop:false
            })
        }
        
    }
    
    
}

class Fire extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, "fire", "Fire ");
        this.body.velocity.x = 200;
    }
}

class Rock extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'Rock');
        this.body.velocity.x = -Phaser.Math.Between(60,100);  
     }
    }


class GemI extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'GemI');
        this.body.velocity.x = -Phaser.Math.Between( 50, 80);
    }
    update(x){
        if(this.scene.health_bar.health+x<= 200)
            this.scene.health_bar.update(x);
        else
            this.scene.health_bar.update(200-this.scene.health_bar.health);
        this.destroy();
        
    }
    
}

class GemII extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'GemII');
        this.body.velocity.x = -Phaser.Math.Between(50,80);
    }
    update(x){
        if(this.scene.laser_bar.health+x<= 200)
            this.scene.laser_bar.update(x);
        else
            this.scene.laser_bar.update(200-this.scene.laser_bar.health);
        this.destroy();
        
    }
    
}

class statusBar extends Entity{
    constructor(scene, x, y, key){
        super(scene, x, y, key, 'HealthBar');
        this.health = 200;
        this.setDisplaySize(this.health, 10);  
    }
    
    update(x){
        if (this.health+x <= 200 && this.health+x >= 0){
            this.health +=x;
            this.setDisplaySize(this.health, 10);    
        }
        
    }
    
}