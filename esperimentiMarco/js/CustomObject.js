
class CustomObject {
	constructor(context, object, commands){
		this.camera = context.cameras.main;
		this.object = object;
		this.customCommands = commands;

		object.setInteractive();

		object.on('pointerdown', function (pointer){
			this.setFocus();
		}, this);

		object.on('pointerin', function (pointer){
			this.setTint(0xff0000);
		});

		object.on('pointerout', function (pointer) {
	        this.clearTint();
	    });

	    object.on('pointerup', function (pointer) {
	        this.clearTint();
	    });
	}

	/*setCommands(customCommands){
		this.customCommands = customCommands;
	}*/

	getObject(){
		return this.object;
	}

	setFocus(){
		this.camera.startFollow(this.object);
		this.customCommands.setObject(this);
	}

	move(direction, overwrite){}

	isMoving(){
		return this.object.body.velocity.x != 0 || this.object.body.velocity.y != 0;
	}

	setGravity(onOff){
		this.object.body.allowGravity = onOff;
	}
}

class CustomPlayer extends CustomObject {
	constructor(context, commands, posX, posY){
		super(context, context.physics.add.sprite(posX, posY, 'dude').setScale(0.1, 0.1), commands);

		this.object.setBounce(0.2);
	    this.object.setCollideWorldBounds(true);

	    this.currentAnimation = 'still';

	    context.anims.create({
	        key: 'down',
	        frames: context.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'up',
	        frames: context.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'left',
	        frames: context.anims.generateFrameNumbers('dude', { start: 8, end: 11}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'still',
	        frames: [ { key: 'dude', frame: 0 } ],
	        frameRate: 20
	    });

	    context.anims.create({
	        key: 'right',
	        frames: context.anims.generateFrameNumbers('dude', { start: 12, end: 15}),
	        frameRate: 10,
	        repeat: -1
	    });
	}

	playAnimation(direction, overwrite){

		if(direction == 'superstill'){
			direction = 'still';
		}

		if(this.currentAnimation == 'still'){
			//this.object.anims.play(direction, true);
			this.currentAnimation = direction;
		}
		else if (direction == 'still' || direction == 'superstill'){
			//this.object.anims.play('still', true);
			this.currentAnimation = 'still';
		}
		else if(overwrite){
			this.currentAnimation = direction;
		}

		this.object.anims.play(this.currentAnimation, true);
	}

	move(direction, overwrite){
		switch(direction){
			case 'left':
				this.playAnimation(direction, overwrite);
				this.object.setVelocityX(-160);
            	//this.object.anims.play('left', true);
			break;
			case 'right':
				this.playAnimation(direction, overwrite);
				this.object.setVelocityX(160);
            	//this.object.anims.play('right', true);
			break;
			case 'up':
				this.playAnimation(direction, overwrite);
				this.object.setVelocityY(-160);
            	//this.object.anims.play('up', true);
			break;
			case 'down':
				this.playAnimation(direction, overwrite);
				this.object.setVelocityY(160);
            	//this.object.anims.play('down', true);
			break;
			case 'still':
				this.object.setVelocityX(0);
				this.playAnimation(direction);
            	//this.object.anims.play('still', true);
			break;
			case 'superstill':
				this.object.setVelocityX(0);
				this.object.setVelocityY(0);
				this.playAnimation(direction);
            	//this.object.anims.play('still', true);
			break;
			case 'jump':
				if(this.object.body.touching.down)
		        {
		            this.object.setVelocityY(-330);
		        }
			break;
		}

		if(overwrite){
			switch(direction){
				case 'up', 'down':
					this.object.setVelocityX(0);
				break;
				case 'left', 'right':
					this.object.setVelocityY(0);
				break;
			}
		}
	}
}

class CustomStar extends CustomObject {
	constructor(context, star, commands){
		super(context, star, commands);
	}

	move(direction){
		switch(direction){
			case 'left':
				this.object.setVelocityX(-160);
			break;
			case 'right':
				this.object.setVelocityX(160);
			break;
			case 'up':
				this.object.setVelocityY(-160);
			break;
			case 'down':
				this.object.setVelocityY(160);
			break;
			case 'still':
				this.object.setVelocityX(0);
			break;
			case 'superstill':
				this.object.setVelocityX(0);
				this.object.setVelocityY(0);
			break;
			case 'jump':
				if(this.object.body.touching.down)
		        {
		            this.object.setVelocityY(-330);
		        }
			break;
		}
	}

	/*move(direction){
		if(direction == 'still'){
			this.object.setTint(0xff0000);
		}
		else{
			this.object.clearTint();
		}
	}*/
}

/*var customObjects = {
	createPlayer: function(context){
		var player = context.physics.add.sprite(100, 450, 'dude').setScale(0.1, 0.1);
    	context.customCommands = new CustomCommands(player, context.input.keyboard);
    	
    	player.setBounce(0.2);
	    player.setCollideWorldBounds(true);

	    context.anims.create({
	        key: 'down',
	        frames: context.anims.generateFrameNumbers('dude', { start: 0, end: 3}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'up',
	        frames: context.anims.generateFrameNumbers('dude', { start: 4, end: 7}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'left',
	        frames: context.anims.generateFrameNumbers('dude', { start: 8, end: 11}),
	        frameRate: 10,
	        repeat: -1
	    });

	    context.anims.create({
	        key: 'still',
	        frames: [ { key: 'dude', frame: 0 } ],
	        frameRate: 20
	    });

	    context.anims.create({
	        key: 'right',
	        frames: context.anims.generateFrameNumbers('dude', { start: 12, end: 15}),
	        frameRate: 10,
	        repeat: -1
	    });

	    return player;
	}
}*/