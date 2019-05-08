
var config = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    physics: {
        default : 'arcade',
        arcade:{
        //gravity: {x:-3},
        debug:false
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
    
};

var player;
var cursors;
//var platforms;

// obsticals.
var rocks;
var coins;
var grnGems;
var redGems;

var game = new Phaser.Game(config);
var gameOver = false;
var score = 0;
var scoreText;
    
function preload()
{
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

function create() 
{
    this.image = this.add.image(350,250, 'bckgrd');
    
    //player
    player = this.physics.add.sprite(200,250,'rocketman');
    typeof(player);

    player.setCollideWorldBounds(true);
    
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    
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
    
    this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    
    this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
    //might be useless
    cursors = this.input.keyboard.createCursorKeys();
    
    
    rock = this.physics.add.group();
    coin = this.physics.add.group();
    grngem = this.physics.add.group();
    redgem=this.physics.add.group();
    
    //random is from [0, 1) so rnad*(max-min+1)+min
    
    var maxY=480, minY=20;
    for(var i = 1; i < 25;i++)
    {
         var rocks = rock.create(i*80+750, Math.random()*(maxY-minY+1)+minY,'rock');   
        if(i > 8)
        {
         var coins = coin.create(i*85+770, Math.random()*(maxY-minY+1)+minY,'coin');   
        }
        if(i> 12){
         var grnGems = grngem.create(i*80+800, Math.random()*(maxY-minY+1)+minY,'grnGem');   
        }
        if(i>12){
         var redGems = redgem.create(i*80+850, Math.random()*(maxY-minY+1)+minY,'redGem');   
        }
    }
    //use this when you've created the ground tiles.
    //platforms = this.physics.add.staticGroup();
    //
    //this creates the floor as an endpoint instead of the screen 
    //this.physics.add.collider(player,platforms);
    
    this.physics.add.collider(player,rock, hitRock, proc_coll, this);
    this.physics.add.overlap(player,coin,collectCoin,null, this);
    this.physics.add.overlap(player,grngem,collectGrn,null, this);
    this.physics.add.overlap(player,redgem,collectRed,null, this);
    
}

function update()
{
    if(gameOver)return;
    
    if(this.key_W.isDown && !this.key_A.isDown)
    {
        player.y+=-2;
        if(this.key_D.isDown && player.x < 360) player.x+=2;
        player.anims.play('Up');
    }
    else if(this.key_S.isDown && !this.key_A.isDown)
    {
        player.y+=2;
        if(this.key_D.isDown && player.x < 360) player.x+=2;
        player.anims.play('Down');
    }
    else
    {
        if(this.key_A.isDown)
        {
            player.x+=-2;
            if(this.key_S.isDown)
                player.y+=2;
            if(this.key_W.isDown)
                player.y+=-2;
        }
        else if((this.key_D.isDown)&&player.x < 360)
                player.x +=2;
        player.anims.play('Default', true);
    }
    rock.setVelocityX(-100);
    coin.setVelocityX(-150);
    grngem.setVelocityX(-100);
    redgem.setVelocityX(-125);

}

function proc_coll(player,rock)
   { return(player.x+19 >= rock.x-19 && player.x-16 <= rock.x+17  &&player.y-12<=rock.y+15 && player.y+15 >= rock.y-15)};
function hitRock(player, rock)
{
    
    this.physics.pause();
    player.setTint(0xffff);
    gameOver = true;
    console.log(player.x,rock.x, player.y, rock.y);

}

function collectCoin(player, coin)
{
    coin.disableBody(true,true);
    score += 5;
    scoreText.setText ( 'score: '+score);

}
function collectGrn(player, grngem)
{
    grngem.disableBody(true, true);
    
    score +=6;
    scoreText.setText('score: '+score);
    
}
function collectRed(player, redgem)
{
    redgem.disableBody(true, true);
    score+=10;
    scoreText.setText('score: '+score);
    
}