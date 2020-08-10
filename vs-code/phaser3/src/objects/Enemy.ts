namespace GreedyArcher {
    export class Enemy extends Phaser.Physics.Arcade.Sprite {

        player : Player

        mimic : boolean

        maxDistanceAllowed = 250
        minDistanceAllowed = 50
        speed = 50

        isMoving = false

        hitNumber = 0

        constructor(scene : BaseScene, x : number, y:number, player : Player, mimic : boolean = true){
            super(scene, x, y, "player")

            this.scene = scene
            this.player = player
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

        public gotHit(){
            this.hitNumber += 1
            let enemy = this
            console.log(this)
            var timer = this.scene.time.addEvent({
                delay: 500,                // ms
                callback: function(){enemy.hitNumber -= 1},
                //args: [],
                //callbackScope: thisArg,
                loop: false
            });
        }

        public update(){

            this.animateMovement()
                
            if(this.hitNumber > 0){
                return
            }

            let distance = this.player.body.position.clone()
            distance.subtract(this.body.position)

            if(distance.length() < this.minDistanceAllowed){
                this.setVelocity(0, 0)
            }
            else { //if(distance.length() > this.maxDistanceAllowed){
                let vel = distance.normalize().scale(this.speed)
                this.setVelocity(vel.x, vel.y)
            }
        }

    }
}