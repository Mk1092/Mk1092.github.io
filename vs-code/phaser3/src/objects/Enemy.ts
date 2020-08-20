namespace GreedyArcher {
    export class Enemy extends Phaser.Physics.Arcade.Sprite {

        private player : Player
        private obstacles : ObjectGroup

        private mimic : boolean

        private minDangerDistance = 100
        private walkingSpeed = 50
        private runningSpeed = 120

        private isMoving = false

        hitNumber = 0

        constructor(scene : BaseScene, x : number, y : number, mimic : boolean = true) {
            super(scene, x, y, mimic ? "player" : "enemy")

            this.player = scene.player
            this.obstacles = scene.objects
            this.mimic = mimic
        }

        public static loadAnims(scene : Phaser.Scene){
            scene.anims.create({
                key: 'enemyStill',
                frames: scene.anims.generateFrameNumbers('enemy', {start: 0}),
                frameRate: 0,
                repeat: -1
            });

            scene.anims.create({
                key: 'enemyWalk',
                frames: scene.anims.generateFrameNumbers('enemy', { start: 1, end: 2}),
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

        public hitByProjectile(){
            this.hitNumber += 1
            var timer = this.scene.time.addEvent({
                delay: 500,                // ms
                callback: function(){this.hitNumber -= 1},
                //args: [],
                callbackScope: this,
                loop: false
            })
        }

        public hitByDanger(){
            this.destroy()
        }

        private getNearestDangerDirection() : Phaser.Math.Vector2 {
            let distance = 10000
            let dir = new Phaser.Math.Vector2(0, 0)
            
            this.obstacles.children.each(function(obstacle : Danger) {
                let newDir = this.body.position.clone().subtract(obstacle.body.position)
                let newDist = newDir.length()
                if(newDist < distance){
                    distance = newDist
                    dir = newDir
                }
              }, this);

              return dir
        }

        public update(){
            
            this.animateMovement()
                
            if(this.hitNumber > 0)
                return

            let escapeDir = this.getNearestDangerDirection()
            if(escapeDir.length() < this.minDangerDistance){
                escapeDir.normalize().scale(this.runningSpeed)
                this.setVelocity(escapeDir.x, escapeDir.y)
                return
            }

            let playerDistance = this.player.body.position.clone()
            playerDistance.subtract(this.body.position)
            let vel = playerDistance.normalize().scale(this.walkingSpeed)
            this.setVelocity(vel.x, vel.y)
        }

    }

    export class EnemyGroup extends Phaser.Physics.Arcade.Group{

        constructor(scene : BaseScene){
            super(scene.physics.world, scene)
            this.runChildUpdate = true
        }

        public createEnemy(x : number, y : number, mimic? : boolean){
            let enemy = new Enemy(<BaseScene>this.scene, x, y, mimic)
            super.add(enemy, true)
            enemy.setCollideWorldBounds(true)
        }
    }
}