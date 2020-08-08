namespace MaintainableGame{
    export class Projectile extends Phaser.Physics.Arcade.Image{
        creationTime : number
        lifetime = 3000

        constructor(scene : Phaser.Scene, position : Phaser.Math.Vector2, vx : number, vy : number){
            super(scene, position.x, position.y, "projectile")

            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.setVelocity(vx, vy)

            this.creationTime = new Date().getTime()

            this.setDrag(50)
            let angle = Phaser.Math.Angle.Between(0, 0, vx, vy)
            angle = angle * 180 / 3.14 + 90
            this.setAngle(angle)
            
            console.log(angle)

            //this.setAngularVelocity(300)
            let projectile = this
            var timer = scene.time.addEvent({
                delay: this.lifetime,                // ms
                callback: function(){projectile.destroy()},
                //args: [],
                //callbackScope: context,
                loop: false
            });
        }

        public checkLifetime() : boolean {
            let now = new Date().getTime()
            return now < this.creationTime + this.lifetime
            /*if(now < this.creationTime + this.lifetime)
                this.destroy()*/
        }
    }
}