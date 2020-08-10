namespace GreedyArcher{

    export class Player extends Phaser.Physics.Arcade.Sprite{

        baseScene : BaseScene
        projectiles : ProjectileGroup

        static speed : number = 200;
        direction = {x: 0, y: 0}
        isMoving : boolean = false

        lastShot = 0
        static shotInterval = 500

        playerAim = true
        aimLine : Phaser.GameObjects.Line = null
        arrowLoaded = false

        /*--------------------------------------------------------------------*/

        constructor(scene : BaseScene, x : number, y:number, projectiles : ProjectileGroup){
            super(scene, x, y, "player")

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.baseScene = scene

            this.projectiles = projectiles

            this.setCollideWorldBounds(true)

            this.addMovementKey('W', 0, -1)
            this.addMovementKey('A', -1, 0)
            this.addMovementKey('S', 0, 1)
            this.addMovementKey('D', 1, 0)

            let player = this
            scene.setDebugText("Personaggio")
            this.addDownKeyCommand('Space', function() {
                player.playerAim = !player.playerAim
                if(player.playerAim)
                    scene.setDebugText("Personaggio")
                else{
                    scene.setDebugText("Centro")
                }
            })

            this.aimLine = this.scene.add.line(0, 0, 0, 0, 0, 0, 0xff0000).setOrigin(0, 0)
        }

        private addMovementKey(key : string, xDir : number, yDir : number){
            let MovKey = this.scene.input.keyboard.addKey(key)
            let player = this
            MovKey.on('down', function(event) {player.updateDir(xDir, yDir)})
            MovKey.on('up', function(event) {player.updateDir(-xDir, -yDir)})
        }

        private addDownKeyCommand(key : string, callback : Function) {
            let commandKey = this.scene.input.keyboard.addKey(key)
            commandKey.on('down', callback)
        }

        private updateDir(x : number, y : number){
            this.direction.x += x
            this.direction.y += y

            this.direction.x = Math.max(Math.min(this.direction.x, 1), -1)
            this.direction.y = Math.max(Math.min(this.direction.y, 1), -1)
        }

        private showAimLine(mousePos? : Phaser.Math.Vector2){

            if(!mousePos){
                this.setLine()
                return
            }

            let aim : Phaser.Math.Vector2
            if(this.playerAim){
                aim = this.body.center
            }
            else{
                aim = new Phaser.Math.Vector2(0, 0)
            }

            this.setLine(mousePos, aim)
        }

        private shoot(mousePos : Phaser.Math.Vector2){
            let now = new Date().getTime()
            if(now > this.lastShot + Player.shotInterval){
                this.projectiles.fire(this.body.center, mousePos, this.playerAim)
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

        public animateMovement(){

            let vx = this.direction.x * Player.speed
            let vy = this.direction.y * Player.speed

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

        private checkMouseLeftClick(){
            let leftDown = this.scene.input.mousePointer.leftButtonDown()

            let {width, height} = this.scene.game.canvas
            let center = new Phaser.Math.Vector2(width/2, height/2)
            let mousePos = this.scene.input.mousePointer.position.clone().subtract(center)
                    
            if(leftDown){
                this.arrowLoaded = true
                this.showAimLine(mousePos)
            }
            else{
                this.setLine()
                if(this.arrowLoaded){
                    this.shoot(mousePos)
                    this.arrowLoaded = false
                }
            }
        }

        public update(){
            this.animateMovement()
            this.checkMouseLeftClick()
        }

        private setLine(start : Phaser.Math.Vector2 = null, end : Phaser.Math.Vector2 = null){
            this.aimLine.destroy()
            if(start !== null &&  end != null)
                this.aimLine = this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, 0xff0000).setOrigin(0, 0)
        }
    }

}