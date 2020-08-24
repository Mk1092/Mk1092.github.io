namespace GreedyArcher{

    export class Player extends Phaser.Physics.Arcade.Sprite {

        projectiles : ProjectileGroup

        // Pg movements
        static speed = 200;
        direction = {x: 0, y: 0}
        isMoving = false

        // Pg fire rate
        lastShot = 0
        static shotInterval = 500

        // Game options
        playerAim = true  //aim to the center of the screen or to pg?
        loadByDist = true //arrow power is based on distance or time?

        // aim line object
        aimLine : Phaser.GameObjects.Line = null

        // needed to shoot an arrow on left pointer up
        arrowLoaded = false
        
        //needed for space-based arrows loading
        static maxLoadingSpace = 150

        // needed for time-based arrows loading
        arrowLoadTime = 0
        static maxLoadingTime = 1000 //ms

        /*--------------------------------------------------------------------*/

        constructor(scene : BaseLevel, x : number, y:number) {
            super(scene, x, y, "player")

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.projectiles = scene.projectiles

            this.setCollideWorldBounds(true)

            this.addMovementKey('W', 0, -1)
            this.addMovementKey('A', -1, 0)
            this.addMovementKey('S', 0, 1)
            this.addMovementKey('D', 1, 0)

            let player = this
            
            this.addDownKeyCommand('Z', function() {
                player.playerAim = !player.playerAim
                Player.updateDebugText(player, scene)
            })

            this.addDownKeyCommand('X', function(){
                player.loadByDist = !player.loadByDist
                Player.updateDebugText(player, scene)
            })

            Player.updateDebugText(player, scene)

            this.aimLine = this.scene.add.line(0, 0, 0, 0, 0, 0, 0x000000).setOrigin(0, 0)
        }

        private static updateDebugText(player : Player, scene : BaseLevel){
            let message = "Z:" + (player.playerAim ? "Personaggio" : "Centro") + ", X:" + (player.loadByDist ? "Distanza" : "Tempo")
            scene.setDebugText(message)
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

        private showAimLine(mousePos : Phaser.Math.Vector2, time : number){
            let aim : Phaser.Math.Vector2 = this.playerAim ? this.body.center : new Phaser.Math.Vector2(0, 0)
            this.setLine(mousePos, aim, time)
        }

        private shoot(mousePos : Phaser.Math.Vector2, time : number){
            if(time > this.lastShot + Player.shotInterval){
                let aimLineVec = this.getAimLineVector(mousePos)
                let arrowLoadRate = this.getArrowLoadRate(aimLineVec.length(), time)
                this.projectiles.fire(this.body.center, aimLineVec, arrowLoadRate, this.playerAim)
                this.lastShot = time
            }
        }

        public gotHit(){
            this.scene.scene.start(this.scene.scene.key)
        }

        public foundGoal(){
            this.scene.scene.start("Menu")
        }

        public static loadAnims(scene : Phaser.Scene){
            scene.anims.create({
                key: 'still',
                frames: scene.anims.generateFrameNumbers('player', {start: 0}),
                frameRate: 0,
                repeat: -1
            });

            scene.anims.create({
                key: 'walk',
                frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 2}),
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

        private checkMouseLeftClick(time : number){
            let leftDown = this.scene.input.mousePointer.leftButtonDown()

            let {width, height} = (<BaseLevel>this.scene).gameRect//.game.canvas
            let center = new Phaser.Math.Vector2(width/2, height/2)
            let mousePos = this.scene.input.mousePointer.position.clone().subtract(center)
            
            if(leftDown){
                if(!this.arrowLoaded){
                    this.arrowLoaded = true
                    this.arrowLoadTime = time
                }
                
                this.showAimLine(mousePos, time)
            }
            else{
                this.removeAimLine()
                if(this.arrowLoaded){
                    this.shoot(mousePos, time)
                    this.arrowLoaded = false
                }
            }
        }

        public update(time : number, delta : number){
            this.animateMovement()
            this.checkMouseLeftClick(time)
        }

        private setLine(start : Phaser.Math.Vector2, end : Phaser.Math.Vector2, time : number){
            this.aimLine.destroy()
            
            let arrowLoadRate = this.getArrowLoadRate(end.clone().subtract(start).length(), time)

            let red =  Phaser.Math.RoundTo(200 * arrowLoadRate, 0)
            let green = Phaser.Math.RoundTo(255 * (1 - arrowLoadRate), 0)
            let blue = 200 * arrowLoadRate * (1 - arrowLoadRate)

            let color = blue + 256 * (green + 256 * red)

            this.aimLine = this.scene.add.line(0, 0, start.x, start.y, end.x, end.y, color).setOrigin(0, 0)
       }

        private removeAimLine(){
           this.aimLine.destroy()
        }

        private getAimLineVector(mousePos : Phaser.Math.Vector2) : Phaser.Math.Vector2{

            let aimLineVec = mousePos.clone()
            aimLineVec.negate()

            if(this.playerAim){
                aimLineVec.add(this.body.center)
            }

            return aimLineVec
        }

        private getArrowLoadRate(aimLineLength : number, time : number) : number {
            let rate : number

            if(this.loadByDist){
                rate = aimLineLength / Player.maxLoadingSpace
            }
            else{
                let delta = time - this.arrowLoadTime
                rate = delta / Player.maxLoadingTime
            }

            let limitedRate = Math.min(rate, 1)
            limitedRate = Math.max(limitedRate, 0.15)
            return limitedRate
        }
    }

}