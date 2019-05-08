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
        
        //add button images. 
        
    }
    
    create(){
        this.image=this.add.image(350,250, 'bckgrd');
        this.scene.start("SceneMain");
    
    
    }
    
    
} 

