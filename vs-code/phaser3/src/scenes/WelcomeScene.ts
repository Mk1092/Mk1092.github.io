///<reference path = "BaseScene.ts" />
///<reference path = "../GameUtils.ts" />

namespace GreedyArcher {

    export class Welcome extends BaseScene {
        logo: Phaser.GameObjects.Image;

        constructor() {
            super({key: "Welcome"})
        }

        preload() {
            this.load.image('logo', './assets/dude.png')
        }

        create() {

            //Canvas dims
            let { width, height } = this.sys.game.canvas

            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);

            this.logo = this.add.image(width/2, height/2, 'logo');
            this.logo.setScale(.5,.5);
         
            let tween = this.tweens.add({
                targets: this.logo,
                scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                yoyo: true,
                repeat: -1
            });

            var style = { font: "bold 24px Arial", fill: "#fff"};

            var text = this.add.text(0, 0, "Premi invio", style);
            text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

            setSizeblePos(50, 45, text, width, height)

            var ctx = this
            var keyObj = this.input.keyboard.addKey('Enter')
            keyObj.on('down', function(event) {ctx.scene.start("Level1")});
        }
    }
}