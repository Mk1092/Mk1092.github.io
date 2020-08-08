///<reference path = "BaseScene.ts" />

namespace MaintainableGame {

    export class Level1 extends BaseScene {
        bg : Phaser.GameObjects.TileSprite;
        player : Player
        obstacle : Phaser.Physics.Arcade.Image
        //pFactory : ProjectileFactory

        // -------------------------------------------------------------------------

        /*constructor(){
            super({
                key: "level1",
                //plugins: ["TweenManager"]
            })
        }*/

        preload() {

            this.load.image('bg', './assets/garden.jpeg')
            this.load.image('obstacle', './assets/dude.png')
            this.load.image('projectile', './assets/arrow.png')
            this.load.spritesheet('player', './assets/omino.png', { frameWidth: 26, frameHeight: 64 })
            
        }

        public create(): void {
            super.create()

            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);

            // focus on 0, 0
            this.setView();

            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');

            //this.pFactory = new ProjectileFactory()
            this.player = new Player(this, 0, 0/*, this.pFactory*/)
            this.player.loadAnims()

            this.obstacle = this.physics.add.staticImage(0, 200, "obstacle")
            this.physics.add.collider(this.player, this.obstacle)
        }

        public update(){
            this.bg.tilePositionY += 2
            this.player.move()
            this.player.checkMouseLeftClick()
            //this.pFactory.cleanQueue()
        }
    }
}