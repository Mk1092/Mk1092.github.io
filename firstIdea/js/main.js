//<script type="text/javascript">

class GameScene extends Phaser.Scene {
	constructor(){
		super('game');
		this.score = 0;
		this.gameOver = false;
		//this.commandsType = 0;
	}

/*var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};*/

//var game = new Phaser.Game(config);

//var commandsType = 1;

preload ()
{

	console.log("preload");

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/retro_dude.png',
        { frameWidth: 400, frameHeight: 599 });
        /*'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 });*/

    //thisPlaceholder = this;

    //keyboard = this.input.keyboard;
    //createKeyboardEvents(this);
}

/*var platforms;
var score = 0;
var scoreText;
var bombs;*/

create ()
{
	this.add.image(400, 300, 'sky');

    var platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(700, 300, 'ground')

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    var playable = this.physics.add.group();
    this.customCommands = new CustomCommands(this.input.keyboard);

    CPlayer.createAnimations(this);

    playable.add(new CPlayer(this));
    playable.add(new CPlayer(this));
    playable.add(new CPlayer(this));
    
    this.physics.add.collider(playable, platforms);

    //player.setCollideWorldBounds(true);
    //this.player.body.collideOnWorldBounds = true;
	//this.player.onWorldBounds = true;

    var stars = this.add.group();
    stars.add(new InteractableObject(this, 200, 200, 0xff0000));
    stars.add(new InteractableObject(this, 500, 200, 0x00ff00));
    stars.add(new InteractableObject(this, 300, 400, 0x0000ff));
    
    var blockStar = this.physics.add.image(300, 300, 'star');

    blockStar.body.setBounce(0.5);
    blockStar.body.setCollideWorldBounds(true);

    this.physics.add.collider(blockStar, playable);
    this.physics.add.collider(blockStar, platforms);

    this.physics.add.collider(playable, stars, this.test, null, this);

    var goal = new AutIntObject(this, 650, 150);

    this.physics.add.collider(goal, playable, function() {
        this.scene.start('preload');
    }, null, this)

    playable.children.iterate(function(child){
    	child.body.setCollideWorldBounds(true);
    });
}

update ()
{
    this.customCommands.exec();
}

test(obj1, obj2){
    if(obj1.setInteractable != null){
        obj1.setInteractable(obj2);
        return;
    }
    if(obj2.setInteractable != null){
        obj2.setInteractable(obj1);
        return;
    }
    console.log("error here!!!");
}

collectStar (player, star)
{
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    if (this.stars.countActive(true) === 0)
    {
        this.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

hitBomb (player, bomb)
{
    //this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    this.gameOver = true;
}



/*render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}*/

}
//</script>


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 300 },
            debug: true
        }
    },
    scene: [PreloadScene, GameScene]
};

game = new Phaser.Game(config);