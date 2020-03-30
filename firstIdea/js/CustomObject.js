
class CustomObject extends Phaser.GameObjects.Sprite {
	constructor(scene, commands, x, y, texture){
		super(scene, x, y, texture);

		//var world = scene.physics.world;
		//this.body = new Phaser.Physics.Arcade.Body(world, this);

		//scene.players.add(this);
		scene.add.existing(this);

		this.camera = scene.cameras.main;
		this.customCommands = commands;

		this.setInteractive();

		this.on('pointerdown', function (pointer){
			this.setFocus();
		}, this);

		this.on('pointerin', function (pointer){
			this.setTint(0xff0000);
		});

		this.on('pointerout', function (pointer) {
	        this.clearTint();
	    });

	    this.on('pointerup', function (pointer) {
	        this.clearTint();
	    });
	}

	setFocus(){
		this.camera.startFollow(this);
		this.customCommands.setObject(this);
	}

	move(direction, overwrite){}

	isMoving(){
		return //this.body.velocity.x != 0 || //this.body.velocity.y != 0;
	}

	setGravity(onOff){
		//this.body.allowGravity = onOff;
	}
}

class CustomPlayer extends CustomObject {
	constructor(scene, commands, posX, posY){
		//super(scene, scene.physics.add.sprite(posX, posY, 'dude').setScale(0.1, 0.1), commands);
		super(scene, commands, posX, posY, 'dude');

		//this.body.setBounce(0.0);
	    //this.body.setCollideWorldBounds(true);

	    this.currentAnimation = 'still';

	    
	}

	static createAnimations(scene){
		scene.anims.create({
	        key: 'down',
	        frames: scene.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
	        frameRate: 10,
	        repeat: -1
	    });

	    scene.anims.create({
	        key: 'up',
	        frames: scene.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
	        frameRate: 10,
	        repeat: -1
	    });

	    scene.anims.create({
	        key: 'left',
	        frames: scene.anims.generateFrameNumbers('dude', { start: 8, end: 11}),
	        frameRate: 10,
	        repeat: -1
	    });

	    scene.anims.create({
	        key: 'still',
	        frames: [ { key: 'dude', frame: 0 } ],
	        frameRate: 20
	    });

	    scene.anims.create({
	        key: 'right',
	        frames: scene.anims.generateFrameNumbers('dude', { start: 12, end: 15}),
	        frameRate: 10,
	        repeat: -1
	    });
	}

	playAnimation(direction, overwrite){

		if(direction == 'superstill'){
			direction = 'still';
		}

		if(this.currentAnimation == 'still'){
			//this.anims.play(direction, true);
			this.currentAnimation = direction;
		}
		else if (direction == 'still' || direction == 'superstill'){
			//this.anims.play('still', true);
			this.currentAnimation = 'still';
		}
		else if(overwrite){
			this.currentAnimation = direction;
		}

		this.anims.play(this.currentAnimation, true);
	}

	move(direction, overwrite){
		switch(direction){
			case 'left':
				this.playAnimation(direction, overwrite);
				//this.body.setVelocityX(-160);
            	//this.anims.play('left', true);
			break;
			case 'right':
				this.playAnimation(direction, overwrite);
				//this.body.setVelocityX(160);
            	//this.anims.play('right', true);
			break;
			case 'up':
				this.playAnimation(direction, overwrite);
				//this.body.setVelocityY(-160);
            	//this.anims.play('up', true);
			break;
			case 'down':
				this.playAnimation(direction, overwrite);
				//this.body.setVelocityY(160);
            	//this.anims.play('down', true);
			break;
			case 'still':
				//this.body.setVelocityX(0);
				this.playAnimation(direction);
            	//this.anims.play('still', true);
			break;
			case 'superstill':
				//this.body.setVelocityX(0);
				//this.body.setVelocityY(0);
				this.playAnimation(direction);
            	//this.anims.play('still', true);
			break;
			case 'jump':
				if(true)//this.body.touching.down)
		        {
		            //this.body.setVelocityY(-330);
		        }
			break;
		}

		if(overwrite){
			switch(direction){
				case 'up', 'down':
					//this.body.setVelocityX(0);
				break;
				case 'left', 'right':
					//this.body.setVelocityY(0);
				break;
			}
		}
	}
}

class CustomStar extends CustomObject {
	constructor(scene, commands, x, y){
		super(scene, commands, x, y, 'star');
	}

	move(direction){
		switch(direction){
			case 'left':
				//this.body.setVelocityX(-160);
			break;
			case 'right':
				//this.body.setVelocityX(160);
			break;
			case 'up':
				//this.body.setVelocityY(-160);
			break;
			case 'down':
				//this.body.setVelocityY(160);
			break;
			case 'still':
				//this.body.setVelocityX(0);
			break;
			case 'superstill':
				//this.body.setVelocityX(0);
				//this.body.setVelocityY(0);
			break;
			case 'jump':
				if(true)//this.body.touching.down)
		        {
		            //this.body.setVelocityY(-330);
		        }
			break;
		}
	}
}