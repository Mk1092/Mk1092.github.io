namespace GreedyArcher {
    export class Enemy extends Phaser.Physics.Arcade.Sprite {

        player : Player
        obstacles : ObstacleGroup

        mimic : boolean

        minDistanceAllowed = 100
        walkingSpeed = 50
        runningSpeed = 120

        isMoving = false

        hitNumber = 0
        destroyed = false

        constructor(scene : BaseScene, x : number, y:number, player : Player, obstacles : ObstacleGroup, mimic : boolean = true){
            super(scene, x, y, mimic ? "player" : "enemy")

            this.scene = scene
            this.player = player
            this.obstacles = obstacles
            this.mimic = mimic

            scene.physics.add.existing(this)
            scene.add.existing(this)
        }

        public loadAnims(){
            this.scene.anims.create({
                key: 'enemyStill',
                frames: this.scene.anims.generateFrameNumbers('enemy', {start: 0}),
                frameRate: 0,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'enemyWalk',
                frames: this.scene.anims.generateFrameNumbers('enemy', { start: 1, end: 2}),
                frameRate: 10,
                repeat: -1
            });
        }

        private animateMovement(){
            let walk = this.mimic ? "walk" : "enemyWalk"
            let still = this.mimic ? "still" : "enemyStill"
            if(this.body.velocity.length() > 0){
                if(!this.isMoving){
                    this.scene.anims.play(walk, this)
                    this.isMoving = true
                }
            }
            else{
                if(this.isMoving){
                    this.scene.anims.play(still, this)
                    this.isMoving = false
                }
            }
        }

        public gotHit(destroy : boolean, projectiles ? : ProjectileGroup){

            if(projectiles){
                let projectile = this.getNearestProjectile(projectiles)
                projectile.onHit()
            }

            if(destroy){
                this.destroyed = true
                this.body.reset(1000, 1000)
                this.setActive(false);
                this.setVisible(false);
                return
            }

            this.hitNumber += 1
            let enemy = this
            var timer = this.scene.time.addEvent({
                delay: 500,                // ms
                callback: function(){enemy.hitNumber -= 1},
                //args: [],
                //callbackScope: thisArg,
                loop: false
            });
        }

        private getNearestProjectile(projectiles : ProjectileGroup) : Projectile {
            let distance = 10000
            let pos = this.body.position
            let projectile : Projectile = null

            projectiles.children.each(function(proj : Projectile){
                let newDist = proj.body.position.clone().subtract(pos).length()
                if(newDist < distance){
                    distance = newDist
                    projectile = proj
                }
            })

            return projectile
        }

        private static getNearestDangerDirection(enemy : Enemy) : Phaser.Math.Vector2 {
            let distance = 10000
            let dir = new Phaser.Math.Vector2(0, 0)
            
            enemy.obstacles.children.each(function(obstacle : Obstacle) {
                let newDir = enemy.body.position.clone().subtract(obstacle.body.position)
                let newDist = newDir.length()
                if(newDist < distance){
                    distance = newDist
                    dir = newDir
                }
              }, this);

              return dir
        }

        public update(){

            if(this.destroyed){
                return
            }
            
            this.animateMovement()
                
            if(this.hitNumber > 0){
                return
            }

            let dangerDir = Enemy.getNearestDangerDirection(this)
            if(dangerDir.length() < this.minDistanceAllowed){
                dangerDir.normalize().scale(this.runningSpeed)
                this.setVelocity(dangerDir.x, dangerDir.y)
                return
            }

            let playerDistance = this.player.body.position.clone()
            playerDistance.subtract(this.body.position)
            let vel = playerDistance.normalize().scale(this.walkingSpeed)
            this.setVelocity(vel.x, vel.y)
        }

    }
}