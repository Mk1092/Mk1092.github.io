namespace GreedyArcher{

    export class Projectile extends Phaser.Physics.Arcade.Image{
        private static vFactor = 1.8
        private static dFactor = 0.98
        private static stillLifetime = 2000
        private stopTime : number = null

        constructor(scene : Phaser.Scene){
            super(scene, 0, 0, "projectile")
            
            scene.physics.add.existing(this)
            scene.add.existing(this)

            this.setCircle(this.body.width/2)
        }

        getClassName(){
            return Projectile.getClassName()
        }

        static getClassName(){
            return "Projectile"
        }

        public fire(position : Phaser.Math.Vector2, mousePos : Phaser.Math.Vector2, playerAim : boolean = true){
            this.body.reset(position.x, position.y)

            this.setActive(true);
            this.setVisible(true);

            let vel = mousePos.clone()
            vel.negate()
            if(playerAim){
                vel.add(position)
            }

            this.setVelocity(vel.x * Projectile.vFactor, vel.y * Projectile.vFactor)

            this.setDamping(true)
            this.setDrag(Projectile.dFactor)

            let angle = Phaser.Math.Angle.Between(0, 0, vel.x, vel.y)
            angle = angle * 180 / 3.14 + 90
            this.setAngle(angle)
        }

        public onHit(){
            this.body.reset(1000, 1000)
            this.setActive(false);
            this.setVisible(false);
        }

        update(time, delta){
            if(this.body.velocity.length() < 20){
                if(this.stopTime === null){
                    this.stopTime = time
                }
                else{
                    if(time > this.stopTime + Projectile.stillLifetime){
                        this.onHit()
                    }
                }
            }
        }
    }

    export class ProjectileGroup extends Phaser.Physics.Arcade.Group{
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)

            this.createMultiple({
                frameQuantity: 30,
                key: 'bullet',
                active: false,
                visible: false,
                setXY: {x: 1000, y:1000},
                classType: Projectile
            })

            this.runChildUpdate = true
        }

        public fire(position : Phaser.Math.Vector2, mousePos : Phaser.Math.Vector2, playerAim? : boolean){
            let projectile : Projectile = this.getFirstDead()

            if(projectile){
                projectile.fire(position, mousePos, playerAim)
            }
        }
    }
}