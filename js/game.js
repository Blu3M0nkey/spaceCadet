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
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver,
        SceneCredits
    ]

    
    
};

var game = new Phaser.Game(config);

