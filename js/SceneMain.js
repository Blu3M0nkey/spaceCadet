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
        this.load.image('coin', 'asset/coin.svg')
        this.load.image('grnGem', 'asset/grn_gem.svg')
        this.load.image('redGem','asset/red_gem.svg')
        //Sprite Sheets
        this.load.spritesheet('rocketman', 'asset/rocketman.svg', {frameWidth: 77, frameHeight: 48});

        //Sounds
        
    }
    create(){
        
    this.image = this.add.image(350, 250, 'bckgrd');
        //Assign sprite to movements:
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
        
    }
    
    update(){
        this.player.update();

        if(this.key_W.isDown && !this.key_A.isDown)
    {
        this.player.moveUp();
        if(this.key_D.isDown && this.player.x < 360) this.player.moveRight();
        this.player.anims.play('Up');
    }
    else if(this.key_S.isDown && !this.key_A.isDown)
    {
        this.player.moveDown();
        if(this.key_D.isDown && this.player.x < 360) this.player.moveRight();
        this.player.anims.play('Down');
    }
    else
    {
        if(this.key_A.isDown)
        {
            this.player.moveLeft();
            if(this.key_S.isDown)
                this.player.moveDown();
            if(this.key_W.isDown)
                this.player.moveUp();
        }
        else if((this.key_D.isDown)&& this.player.x < 360)
                this.player.moveRight();
        this.player.anims.play('Default', true);
    }
        
        
    }
}