////<reference path = "BaseScene.ts" />
///<reference path = "../GameUtils.ts" />

namespace GreedyArcher {

    export class Welcome extends Phaser.Scene {
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

            // background color
            //this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);
            this.cameras.main.backgroundColor = GUIUtils.bgColor

            this.logo = this.add.image(width/2, height/2, 'logo');
            this.logo.setScale(.5,.5);
         
            let tween = this.tweens.add({
                targets: this.logo,
                scaleX: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                scaleY: { value: 1.0, duration: 2000, ease: 'Back.easeInOut' },
                yoyo: true,
                repeat: -1
            });

            let text = this.add.text(0, 0, "Premi invio", GUIUtils.textStile);
            
            GUIUtils.setTextProperties(text, false, true)

            GUIUtils.setSizeablePos(50, 45, text, width, height)

            let keyObj = this.input.keyboard.addKey('Enter')
            keyObj.on('down', function(event) {this.scene.start("Menu")}, this);
        }
    }
}