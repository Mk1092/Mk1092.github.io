//<script type="text/javascript">

class GameScene extends Phaser.Scene {
	constructor(){
		super('game');
		console.log("constructor");
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
	console.log("create");
    this.add.image(400, 300, 'sky');

    var platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(700, 300, 'ground')

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    var player = this.physics.add.sprite(100, 450, 'dude').setScale(0.1, 0.1);
    this.customCommands = new CustomCommands(player, this.input.keyboard);
    //this.player = player;
	//player = this.physics.add.staticSprite(100, 450, 'dude');

    //this.cameras.main.setBounds(0, 0, 400, 300);
    this.cameras.main.startFollow(player);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 11}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        //frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15 }),
        frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 15}),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    //this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    this.stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    this.physics.add.collider(this.stars, platforms);
    this.physics.add.overlap(player, this.stars, this.collectStar, null, this);

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, platforms);

    this.physics.add.collider(player, this.bombs, this.hitBomb, null, this);
}

update ()
{
    this.customCommands.exec();
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



render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}

}
//</script>


var config = {
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
    scene: [PreloadScene, GameScene]
};

var game = new Phaser.Game(config);