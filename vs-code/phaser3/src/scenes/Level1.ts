///<reference path = "BaseScene.ts" />

namespace MaintainableGame {

    export class Level1 extends BaseScene {
        bg : Phaser.GameObjects.TileSprite;
        player : Player
        //object : Phaser.Physics.Arcade.Image
        obstacle : Phaser.Physics.Arcade.Image
        // -------------------------------------------------------------------------

        /*constructor(){
            super({
                key: "level1",
                //plugins: ["TweenManager"]
            })
        }*/

        preload() {

            this.load.image('bg', './assets/garden.jpeg')
            this.load.image('player', './assets/bomb.png')
            this.load.image('obstacle', './assets/dude.png')
            

            /*var config = {
                map: {
                    add: 'makeStuff',
                    load: 'loader',
                    physics : "arcade"
                }
            };
    
            Phaser.Scene.call(this, config)*/
        }

        public create(): void {

            // bacground color
            this.cameras.main.backgroundColor = Phaser.Display.Color.ValueToColor(0x8080f0);

            // focus on 0, 0
            this.setView();

            this.bg = this.add.tileSprite(0, 0, 800, 600, 'bg');

            this.player = new Player(this, 0, 0, "player")
            //this.object = this.physics.add.image(0, 20, "player")
            this.obstacle = this.physics.add.staticImage(0, 200, "obstacle")
            //this.obstacle.setAcceleration(0, -300)

            this.physics.add.collider(this.player, this.obstacle)
        }

        public update(){
            this.bg.tilePositionY += 2

            this.player.move()
                
            //this.physics.collide(this.player, this.obstacle, function(event){console.log("collision")})
            //this.physics.overlap(this.object, this.obstacle, function(event){console.log("overlap")})

            //this.physics.world.collide(this.object, this.obstacle, function(event){console.log("collision")})
            //this.physics.world.overlap(this.object, this.obstacle, function(event){console.log("overlap")})
        }
    }
}