// this enables class useage, error in eslint.js update, i think this rolls back some stuff...
/* eslint-env es6 */
/* eslint-disable */

class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({key:"SceneMainMenu"});
    }
    
    preload() {
        this.load.image("dude", "asset/Images/surfer.svg");
        this.load.image("bckgrd","asset/bckgrd.svg");
        this.load.image('btnNorm','asset/btnNorm.svg');
        this.load.image('btnHover','asset/btnHover.svg');
        this.load.image('btnPush','asset/btnPush.svg');
        
        //add button images. 
        
    }
    
    create(){
        this.image=this.add.image(350,250, 'bckgrd');
        //this.scene.start("SceneMain");
        
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

