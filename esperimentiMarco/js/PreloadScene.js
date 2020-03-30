class PreloadScene extends Phaser.Scene {
	constructor(){
		super('preload')
	}

	preload(){
		this.load.image('test', 'assets/dude.png');
	}

	create(){
		this.add.image(400, 300, 'test');
		this.input.on('pointerdown', () => this.scene.start('game'), this);
	}
}