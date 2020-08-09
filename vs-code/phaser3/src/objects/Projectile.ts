namespace MaintainableGame{
    export class Projectile extends Phaser.Physics.Arcade.Image{
        static vFactor = 1.8
        static dFactor = 0.98
        static stillLifetime = 2000
        stopTime : number = null

        constructor(scene : Phaser.Scene, position : Phaser.Math.Vector2, vx : number, vy : number){
            super(scene, position.x, position.y, "projectile")

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.setCircle(this.body.width/2)
            
            this.setVelocity(vx * Projectile.vFactor, vy * Projectile.vFactor)

            this.setDamping(true)
            this.setDrag(Projectile.dFactor)

            let angle = Phaser.Math.Angle.Between(0, 0, vx, vy)
            angle = angle * 180 / 3.14 + 90
            this.setAngle(angle)

            this.destroyAfterLongStop()
        }

        private setTimerEvent(){
            let projectile = this
                var timer = this.scene.time.addEvent({
                    delay: 200,                // ms
                    callback: function(){projectile.destroyAfterLongStop()},
                    //args: [],
                    //callbackScope: context,
                    loop: false
                });
        }

        private destroyAfterLongStop(){

            if(this.body.velocity.length() < 20){
                if(this.stopTime === null){
                    this.stopTime = new Date().getTime()
                }
                else{
                    let now = new Date().getTime()
                    if(now > this.stopTime + Projectile.stillLifetime){
                        this.destroy()
                        return
                    }
                }
            }

            this.setTimerEvent()
        }
    }
}