//Enables use of  'class' 
/* eslint-env es6 */
/* eslint-disable */

class SceneMain extends Phaser.Scene{
    constructor(){
        super({key:"SceneMain"});
        this.score = 0;
        var scoreBoard;
    }
    
    preload() {
        //Load Game assets
        //Images
        this.load.image('bckgrd', 'asset/Images/bckgrd.svg');
        this.load.image('rock','asset/Images/rock.svg');
        this.load.image('fire', 'asset/Images/fire.svg');
        this.load.image('grnGem', 'asset/Images/grn_gem.svg');
        this.load.image('redGem','asset/Images/red_gem.svg');
        this.load.image('grnBar', 'asset/Images/healthbar.png');
        this.load.image('redBar','asset/Images/firebar.png')
        
        //Sprite Sheets
        this.load.spritesheet('rocketman', 'asset/Images/rocketman.svg', {frameWidth: 77, frameHeight: 48});
        this.load.spritesheet("sprExplosion" , 'asset/Images/Explosion.svg', {frameWidth: 48,frameHeight:48});
        
        
        //Sounds
        //this.load.audio('mp3Theme','asset/Sounds/bensound-scifi.mp3' );
        
        this.load.audio('beamShot','asset/Sounds/sfx-magic-fireball-001.mp3');
        
    }
    
    
    create(){
    // Create images
        
        this.image = this.add.image(350, 250, 'bckgrd');
        
    // Load the score board    
        this.scoreBoard = this.add.text(16,16, "score: 0",{fontSize:'32px', fill: '#fff'});
    
    //Audio
        //this.sound.add('mp3Theme', {volume:0.5}).play();
        this.beamshot = this.sound.add('beamShot');
    
        //Assign sprite to movements:
        this.anims.create({
          key: "sprExplosion",
          frames: this.anims.generateFrameNumbers("sprExplosion"),
          frameRate: 20,
          repeat: 0
        });

        this.anims.create({
            key: 'Default',
            frames: this.anims.generateFrameNumbers('rocketman',{start:0,end:1}),
            frameRate:5,
            repeat: -1

        });
        // static Movements 
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

        // sets the keys to 'listen' for
        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

         //Status Bars
        this.health_bar = new statusBar(this, 550, 25, 'grnBar');    
        this.laser_bar = new statusBar(this, 550, 50, 'redBar'); 

        // Entity groups, components to be repeated
        this.rocks = this.add.group();
        this.gemI = this.add.group();
        this.gemII = this.add.group();
        this.playerFireBeams = this.add.group();


        // Time events for the entity groups, when they should spawn.     
        this.time.addEvent({ 
            delay:1000,
            callback: function(){
                var rock = new Rock(
                this,
                725, 
                Phaser.Math.Between(50, 475),'rock');              
                this.rocks.add(rock);

            },
            callbackScope: this,
            loop: true 
        })

        //Time events for the gems        
        this.time.addEvent({
            delay:5000,
            callback: function(){
                var ggem = new GemI(
                this,
                Phaser.Math.Between(750, 850),
                Phaser.Math.Between( 20, 450),
                'grnGem');  

                var rgem = new GemII(
                this,
                Phaser.Math.Between(750,850),
                Phaser.Math.Between( 20, 450),
                'redGem');

                this.gemI.add(ggem);

                this.gemII.add(rgem);
            },
            callbackScope: this,
            loop: true
        });
        
     
        //Collider events for the entities in the groups
        this.physics.add.collider(this.player, this.rocks, hitRock, proc_coll, this);
        this.physics.add.collider(this.playerFireBeams, this.rocks, destRock, null, this);

        this.physics.add.collider(this.player, this.gemI, collectGrn, null, this);

        this.physics.add.collider(this.player, this.gemII, collectRed, null, this);

}
   
    // Constantly updating the screen. 
    update(){
        // Update the players location
        this.player.update();
        
        //Movement of the player
        // Only for forward diagonal movement tilts the character
        if(this.key_W.isDown && !this.key_A.isDown)
        {
            this.player.moveUp();
            if(this.key_D.isDown) 
                this.player.moveRight();
            this.player.anims.play('Up');
        }
        // Only for forward lower diagonal movement tilts character downwards
        else if(this.key_S.isDown && !this.key_A.isDown){
            this.player.moveDown();
            if(this.key_D.isDown) 
                this.player.moveRight();
            this.player.anims.play('Down');
        }
        //for all other movements to maintain the forward sprite.
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
        
        // For shooting
        if (this.keySpace.isDown && this.laser_bar.health >=5) {
            this.player.setData("isShooting", true);
            
        }
        // reduce the delay timer when not shooting
        else {
            this.player.setData("timerShootTick",    this.player.getData("timerShootDelay") - 1);
            this.player.setData("isShooting", false);
        }  

        // Destroy objects after they leave the screen.
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

    // To reduce the collision bounderies. 
    function proc_coll(player,rock){ 
        return(player.x+19 >= rock.x-19 && player.x-16 <= rock.x+17 && player.y-12 <= rock.y+15 && player.y+15 >= rock.y-15)
    };

    // Handle what happens when the player hits an obstical
    // with a beam
    function destRock(beam, rock){
        if (rock){
            if (rock.onDistroy !== undefined){
                rock.onDistroy();
            }
            rock.explode(true);
            beam.destroy();
            
        
            this.score += 10;
            this.scoreBoard.setText("score: "+ this.score);
            
        }
    };
    
    // With self
    function hitRock(player, rock){
        player.onDestroy(!rock.getData("isDead"));
        if(rock){
            if(rock.onDistroy !== undefined){
                rock.onDistroy();
            }
            rock.explode(true);
        }
        


    };
    
    // Collecting Gems: 
    function collectGrn(player, grngem){
        grngem.update(6);
    };
    
    function collectRed(player, redgem){
        redgem.update(5);
    };