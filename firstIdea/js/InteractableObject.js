class InteractableObject extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, color){
		super(scene, x, y, "star");

		this.color = color;

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
			this.setTint(this.color);
			this.set = false;
		}
		else{
			this.clearTint();
			this.set = true;
		}
	}
}