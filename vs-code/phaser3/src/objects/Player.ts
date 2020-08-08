namespace MaintainableGame{

    export class Player extends Phaser.Physics.Arcade.Sprite{
        baseScene : BaseScene
        //pFactory : ProjectileFactory

        speed : number = 200;
        direction = {x: 0, y: 0}
        isMoving : boolean = false

        lastShot = 0
        shotInterval = 1000

        /*--------------------------------------------------------------------*/

        constructor(scene : BaseScene, x : number, y:number, /*pFactory : ProjectileFactory*/){
            super(scene, x, y, "player")

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.baseScene = scene

            //this.pFactory = pFactory

            this.setCollideWorldBounds(true)

            this.addMovementKey('W', 0, -1)
            this.addMovementKey('A', -1, 0);
            this.addMovementKey('S', 0, 1);
            this.addMovementKey('D', 1, 0);

        }

        private addMovementKey(key : string, xDir : number, yDir : number){
            let MovKey = this.scene.input.keyboard.addKey(key)
            let player = this
            MovKey.on('down', function(event) {player.updateDir(xDir, yDir)})
            MovKey.on('up', function(event) {player.updateDir(-xDir, -yDir)})
        }

        private updateDir(x : number, y : number){
            this.direction.x += x
            this.direction.y += y

            this.direction.x = Math.max(Math.min(this.direction.x, 1), -1)
            this.direction.y = Math.max(Math.min(this.direction.y, 1), -1)
        }

        private shoot(px : number, py : number){
            this.baseScene.setDebugText("px: " + px + " py: " + py)

            let now = new Date().getTime()
            if(now > this.lastShot + this.shotInterval){
                new Projectile(this.scene, this.body.center, -px, -py)
                //this.pFactory.createProjectile(this.scene, this.body.center, -px, -py)
                this.lastShot = now
            }
        }

        public loadAnims(){

            this.scene.anims.create({
                key: 'still',
                frames: this.scene.anims.generateFrameNumbers('player', {start: 0}),
                frameRate: 0,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'walk',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 1, end: 2}),
                frameRate: 10,
                repeat: -1
            });

        }

        public move(){

            let vx = this.direction.x * this.speed
            let vy = this.direction.y * this.speed

            this.setVelocity(vx, vy)

            if(vx != 0 || vy != 0){
                if(!this.isMoving){
                    this.scene.anims.play('walk', this)
                    this.isMoving = true
                }
                
            }
            else{
                if(this.isMoving){
                    this.scene.anims.play('still', this)
                    this.isMoving = false;
                }
                
            }
        }

        public checkMouseLeftClick(){
            let leftDown = this.scene.input.mousePointer.leftButtonDown()

            if(leftDown){
                let {width, height} = this.scene.game.canvas
                let {x, y} = this.scene.input.mousePointer.position
                this.shoot(x - width/2, y - height/2)
            }
            else{
                this.baseScene.setDebugText("")
            }
        }
    }

}