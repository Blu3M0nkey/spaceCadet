/* eslint-env es6 */
/* eslint-disable */

class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({key:"SceneGameOver"});
    }
    
    preload() {
        // Images
        this.load.image("bckgrd","asset/Images/bckgrd.svg");
        this.load.image('endTxt', 'asset/Images/GameOver.png');
        
        // Buttons
        this.load.image('btnNorm','asset/Images/btnNorm.png');
        this.load.image('btnHover','asset/Images/btnHover.png');
        this.load.image('btnPush','asset/Images/btnPush.png');
        
        this.load.spritesheet('btnCredits', 'asset/Images/btnSprCredits.png', {frameWidth: 208.66, frameHeight: 104});

    }
    
    
    create(){
        // Load Background
        this.image=this.add.image(350,250, 'bckgrd');
        
        this.image = this.add.image(350, 100, 'endTxt');
        
        // set button sprite
        this.anims.create({
           key: 'btnCreditNorm',
           frames:[{key:'btnCredits', frame:0}]
        });
        this.anims.create({
            key:'btnCreditHover',
            frames:[{key:'btnCredits',frame:1}]
            });
        this.anims.create({
            key:'btnCreditPush',
            frames:[{key:'btnCredits',frame:2}]
        });
        
        // Instantiate the Button and its functionality
        this.btnPlay = this.add.sprite(200, 250, 'btnNorm');
        this.btnCredit = this.add.sprite(425, 245, 'btnCredit');
        this.btnCredit.anims.play('btnCreditNorm');
        this.btnPlay.setInteractive();//Important
        this.btnCredit.setInteractive();
        
        this.btnPlay.on("pointerover",function(){
            this.btnPlay.setTexture('btnHover');
        },this);
        
        
        this.btnPlay.on("pointerout", function(){
            this.setTexture('btnNorm');
        });
        
        this.btnPlay.on("pointerdown", function(){
            this.btnPlay.setTexture('btnPush');
        }, this);
        
        this.btnPlay.on("pointerup",function(){
            this.btnPlay.setTexture('btnNorm');
            this.scene.start("SceneMain");
        },this);
        
        console.log(this.btnCredit);
        
        this.btnCredit.on("pointerover",function(){
            this.btnCredit.anims.play('btnCreditHover');
        },this);
        
        
        this.btnCredit.on("pointerout", function(){
            this.btnCredit.anims.play('btnCreditNorm');
        }, this);
        
        this.btnCredit.on("pointerdown", function(){
            this.btnCredit.anims.play('btnCreditPush');
        }, this);
        
        this.btnCredit.on("pointerup",function(){
            this.btnCredit.anims.play('btnCreditNorm');
            this.scene.start("SceneCredits");
        },this);
    
        
    }
    
    
} 
