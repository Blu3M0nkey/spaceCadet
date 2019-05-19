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
        

    }
    
    create(){
        // Load Background
        this.image=this.add.image(350,250, 'bckgrd');
        
        this.image = this.add.image(350, 100, 'endTxt');
        
        // Instantiate the Button and its functionality
        this.btnPlay = this.add.sprite(350, 250, 'btnNorm');
        
        this.btnPlay.setInteractive();//Important
        
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
