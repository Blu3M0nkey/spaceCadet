// this enables class useage, error in eslint.js update, i think this rolls back some stuff...
/* eslint-env es6 */
/* eslint-disable */

class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key:"SceneMainMenu"});
    }
    
    preload() {
        this.load.image("dude", "asset/Images/surfer.svg");
        this.load.image("bckgrd","asset/Images/stary_bckgrd.png");
        
        //Buttons
        this.load.image('btnNorm','asset/Images/btnNorm.png');
        this.load.image('btnHover','asset/Images/btnHover.png');
        this.load.image('btnPush','asset/Images/btnPush.png');
        
        //Audio
        this.load.audio('mp3Theme','asset/Sounds/bensound-scifi.mp3' );
        
        
    }
    
    create(){
        this.image=this.add.image(350,250, 'bckgrd');
        
        //For game testing
        //this.scene.start("SceneMain");
        
        //Audio
        this.sound.add('mp3Theme', {volume:0.5}).play();
        
        // Buttons
        this.btnPlay = this.add.sprite(350, 250, 'btnNorm');
        
        this.btnPlay.setInteractive();
        
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
    
    }
    
    
} 

