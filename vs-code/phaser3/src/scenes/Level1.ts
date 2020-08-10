///<reference path = "BaseScene.ts" />

namespace GreedyArcher {

    export class Level1 extends BaseScene {
        //bg : Phaser.GameObjects.TileSprite;
        //player : Player
        //obstacle : Phaser.Physics.Arcade.Image
        //pFactory : ProjectileFactory

        // -------------------------------------------------------------------------

        /*constructor(){
            super({
                key: "level1",
                //plugins: ["TweenManager"]
            })
        }*/

        preload() {

            this.load.image('bg', './assets/pavement3.png')
            this.load.image('obstacle', './assets/bomb.png')
            this.load.image('projectile', './assets/arrow3.png')
            this.load.spritesheet('player', './assets/omino.png', { frameWidth: 26, frameHeight: 64 })
            
        }

        public create() {
            super.create()

            /*this.projectiles = new ProjectileGroup(this)
            this.player = new Player(this, 0, 0, this.projectiles)
            this.player.loadAnims()
            
            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);

            // focus on 0, 0
            this.setView();

            //this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');

            
            this.obstacles = this.physics.add.group()*/
            this.obstacles.add(new Obstacle(this, 150, 150), true)
            this.obstacles.add(new Obstacle(this, 120, 150), true)
            //this.physics.add.collider(this.projectiles, this.obstacles)
            
        }

        public update(time : number, delta : number){
            this.player.move()
            this.player.checkMouseLeftClick()
            this.projectiles.preUpdate(time, delta)
            
        }
    }
}