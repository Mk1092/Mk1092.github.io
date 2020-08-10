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
            this.load.spritesheet('player', './assets/archerD.png', { frameWidth: 52, frameHeight: 64 })
            
        }

        public create() {
            super.create()
            
            //this.obstacles.add(new Obstacle(this, 150, 150), true)
            //this.obstacles.add(new Obstacle(this, 120, 150), true)
            this.obstacles.addObject(new Obstacle(this, 150, 150))
            this.obstacles.addObject(new Obstacle(this, 120, 150))
            //this.physics.add.collider(this.projectiles, this.obstacles)
            
        }

        public update(time : number, delta : number){
            this.player.move()
            this.player.checkMouseLeftClick()
            this.projectiles.preUpdate(time, delta)
            
        }
    }
}