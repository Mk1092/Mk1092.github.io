///<reference path = "BaseScene.ts" />

namespace GreedyArcher {

    export class Level1 extends BaseScene {
        //enemy1 : Enemy
        //enemy2 : Enemy

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
            
            /*this.enemies.add(new Enemy(this, 100, -200, this.player, this.obstacles)) 
            this.enemies.add(new Enemy(this, -300, 250, this.player, this.obstacles, false))*/

            this.enemies.createEnemy(100, -200)
            this.enemies.createEnemy(-300, 250, false)

            /*let scene = this
            this.physics.add.collider(this.enemy1, this.obstacles, function(enemy : Enemy, obstacle : Obstacle){scene.enemy1.gotHit(obstacle)})
            this.physics.add.collider(this.enemy2, this.obstacles, function(enemy : Enemy, obstacle : Obstacle){scene.enemy2.gotHit(obstacle)})
            this.physics.add.collider(this.enemy1, this.projectiles, function(enemy : Enemy, projectile : Projectile){scene.enemy1.gotHit(projectile)})
            this.physics.add.collider(this.enemy2, this.projectiles, function(enemy : Enemy, projectile : Projectile){scene.enemy2.gotHit(projectile)})
            this.physics.add.collider(this.enemy1, this.player, function(){scene.player.gotHit()})
            this.physics.add.collider(this.enemy2, this.player, function(){scene.player.gotHit()})*/

            this.physics.add.collider(this.enemies, this.obstacles, function(enemy : Enemy, obstacle : Obstacle){enemy.hitByDanger()})
            this.physics.add.collider(this.enemies, this.projectiles, function(enemy : Enemy, projectile : Projectile){enemy.hitByProjectile(); projectile.onHit()})
            this.physics.add.collider(this.enemies, this.player, function(player : Player, enemy : Enemy){player.gotHit()})

            //this.enemy1.loadAnims()
            //this.enemies.getFirst().loadAnims()
        }

        /*public update(time : number, delta : number){
            this.player.update()
            this.projectiles.preUpdate(time, delta)
            this.enemies.preUpdate(time, delta)
        }*/
    }
}