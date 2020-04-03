class AutIntObject extends Phaser.GameObjects.Image {
	constructor(scene, x, y){
		super(scene, x, y, "bomb");

		this.setInteractive();
		this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
		this.body.enable = true;

	    this.body.setCollideWorldBounds(true);

	    this.body.immovable = true;
	    this.body.moves = false;

	    scene.add.existing(this);
	    //scene.physics.add.existing(this);
	}
}