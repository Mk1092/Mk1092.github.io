class InteractableObject extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y){
		super(scene, x, y, "star");

		this.setInteractive();
		this.body = new Phaser.Physics.Arcade.Body(scene.physics.world, this);
		this.body.enable = true;

	    this.body.setCollideWorldBounds(true);

	    this.body.immovable = true;
	    this.body.moves = false;

	    scene.add.existing(this);
	    scene.physics.add.existing(this);

	    this.set = false;
	}

	action(){

		if(this.set){
			this.setTint(0xff0000);
			this.set = false;
		}
		else{
			this.clearTint();
			this.set = true;
		}
	}
}