module Example {

    export class ExampleScene extends Phaser.Scene {
        logo: Phaser.GameObjects.Image;

        constructor() {
            super({key: "ExampleScene"})
        }

        preload() {
            this.load.image('logo', './assets/sky.png')
        }

        create() {

            this.logo = this.add.image(+Example.InitPhaser.gameRef.config["width"]/2, +Example.InitPhaser.gameRef.config["height"] / 3, 'logo');
            this.logo.setScale(.5,.5);
         
            let tween = this.tweens.add({
                         targets: this.logo,
                         scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                         scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                         yoyo: true,
                         repeat: -1
                         });
        }
    }
}