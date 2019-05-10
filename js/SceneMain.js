/* eslint-env es6 */
/* eslint-disable */

class SceneMain extends Phaser.Scene{
    constructor(){
        super({key:"SceneMain"});
    
        
    }
    
    
    preload() {
        //Load Game assets
        //Images
        this.load.image('bckgrd', 'asset/bckgrd.svg');
        this.load.image('rock','asset/rock.svg');
        this.load.image('fire', 'asset/fire.svg')
        this.load.image('grnGem', 'asset/grn_gem.svg')
        this.load.image('redGem','asset/red_gem.svg')
        //Sprite Sheets
        this.load.spritesheet('rocketman', 'asset/rocketman.svg', {frameWidth: 77, frameHeight: 48});
        this.load.spritesheet("sprExplosion", 'asset/Explosion.svg', {frameWidth: 48,frameHeight:48});

        //Sounds
        
    }
    create(){
        
    this.image = this.add.image(350, 250, 'bckgrd');
        //Assign sprite to movements:
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });
        
    this.anims.create({
        key: 'Default',//stationary is 'dynamicish'
        frames: this.anims.generateFrameNumbers('rocketman',{start:0,end:1}),
        frameRate:5,
        repeat: -1
        
    });
    //Movements are static
    this.anims.create({
        key: 'Up',
        frames: [{key:'rocketman', frame: 2}],
        frameRate:15
    });
    this.anims.create({
        key: 'Down',
        frames: [{key:'rocketman', frame: 3}],
        frameRate:15
    });
    

    this.player = new Player(
        this,
        200,
        250,
        "rocketman"
        ); 
       
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.rocks = this.add.group();
    this.gemI = this.add.group();
    this.gemII = this.add.group();
    this.playerFireBeams = this.add.group();

    this.time.addEvent({ 
        delay:1000,
        callback: function(){
            var rock = new Rock(
            this,
            700, 
            Phaser.Math.Between(20, 500),'rock');              
            this.rocks.add(rock);

        },
        callbackScope: this,
        loop: true 
    })

        
    this.time.addEvent({
        delay:3500,
        callback: function(){
            var ggem = new GemI(
            this,
            800,
            Phaser.Math.Between( 20, 450),
            'grnGem');  

            var rgem = new GemII(
            this,
            800,
            Phaser.Math.Between( 20, 450),
            'redGem');

            this.gemI.add(ggem);

            this.gemII.add(rgem);
        },
        callbackScope: this,
        loop: true
    });
        
    if (this.keySpace.isDown) {
      this.player.setData( "isShooting", true);
    }
    else {
      this.player.setData( "timerShootTick", this.player.getData( "timerShootDelay") - 1);
      this.player.setData( "isShooting", false);
    }

    this.physics.add.collider(this.player, this.rocks, hitRock, proc_coll, this);
    this.physics.add.collider(this.playerFireBeams, this.rocks, destRock)


}
    
    update(){
        this.player.update();
        
        
        
        
        if(this.key_W.isDown && !this.key_A.isDown)
        {
            this.player.moveUp();
            if(this.key_D.isDown) 
                this.player.moveRight();
            this.player.anims.play('Up');
        }
        else if(this.key_S.isDown && !this.key_A.isDown){
            this.player.moveDown();
            if(this.key_D.isDown) 
                this.player.moveRight();
            this.player.anims.play('Down');
        }
        else{
            if(this.key_A.isDown){
            this.player.moveLeft();
            if(this.key_S.isDown)
                this.player.moveDown();
            if(this.key_W.isDown)
                this.player.moveUp();
        }
        else if((this.key_D.isDown))
                this.player.moveRight();
        this.player.anims.play('Default', true);
        }
        if (this.keySpace.isDown) {
            this.player.setData("isShooting", true);
        }
        else {
            this.player.setData("timerShootTick",    this.player.getData("timerShootDelay") - 1);
            this.player.setData("isShooting", false);
        }  

        for (var i = 0; i < this.rocks.getChildren().length; i++ ){
            var rockI = this.rocks.getChildren()[i];
            if(rockI.x < - rockI.displayWidth){
                if(rockI){
                    rockI.destroy();
                }
            }
        }
        
        for (var i = 0; i < this.gemI.getChildren().length; i++ ){
            var gem = this.gemI.getChildren()[i];
            
            if(gem.x < - gem.displayWidth){
                if(gem){
                    gem.destroy();
                }
            }
        }
        for (var i = 0; i < this.gemII.getChildren().length; i++ ){
            var gem = this.gemII.getChildren()[i];
            
            if(gem.x < - gem.displayWidth){
                if(gem){
                    gem.destroy();
                }
            }
        }
        
        
        
    }
}
    function proc_coll(player,rock){ 
        return(player.x+19 >= rock.x-19 && player.x-16 <= rock.x+17  &&player.y-12<=rock.y+15 && player.y+15 >= rock.y-15)
    };
    function destRock(beam, rock){
        if (rock){
            if (rock.onDistroy !== undefined){
                rock.onDistroy();
            }
            rock.explode(true);
            beam.destroy();
        }
    };
    function hitRock(player, rock){
        this.physics.pause();
        player.setTint(0xffff);
        this.player.setData("isDead", true)
        //console.log(player.x,rock.x, player.y, rock.y);
    };

    function collectCoin(player, coin){
        coin.disableBody(true,true);
        score += 5;
        scoreText.setText ( 'score: '+score);
    };
    
    function collectGrn(player, grngem){
        grngem.disableBody(true, true);
        score +=6;
        scoreText.setText('score: '+score);
    };
    
    function collectRed(player, redgem){
        redgem.disableBody(true, true);
        score+=10;
        scoreText.setText('score: '+score);
    };
    
    




