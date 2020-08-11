///<reference path = "BaseScene.ts" />

namespace GreedyArcher {

    export class Level1 extends BaseScene {
        enemy1 : Enemy
        enemy2 : Enemy

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
            this.load.spritesheet('enemy', './assets/omino.png', { frameWidth: 26, frameHeight: 64 })
            
        }

        public create() {
            super.create()
            
            this.obstacles.addObject(new Obstacle(this, 150, 150))
            this.obstacles.addObject(new Obstacle(this, 120, 150))
            
            this.enemy1  = new Enemy(this, 100, -200, this.player, this.obstacles)
            this.enemy2 = new Enemy(this, -300, 250, this.player, this.obstacles, false)

            let scene = this
            this.physics.add.collider(this.enemy1, this.obstacles, function(){scene.enemy1.gotHit(true)})
            this.physics.add.collider(this.enemy2, this.obstacles, function(){scene.enemy2.gotHit(true)})
            this.physics.add.collider(this.enemy1, this.projectiles, function(){scene.enemy1.gotHit(false, scene.projectiles)})
            this.physics.add.collider(this.enemy2, this.projectiles, function(){scene.enemy2.gotHit(false, scene.projectiles)})
            this.physics.add.collider(this.enemy1, this.player, function(){scene.player.gotHit()})
            this.physics.add.collider(this.enemy2, this.player, function(){scene.player.gotHit()})

            this.enemy1.loadAnims()
        }

        public update(time : number, delta : number){
            //this.player.move()
            //this.player.checkMouseLeftClick()
            this.player.update()
            this.projectiles.preUpdate(time, delta)

            this.enemy1.update()
            this.enemy2.update()
        }
    }
}