namespace GreedyArcher{

    export class LevelObject extends Phaser.Physics.Arcade.Image {
        public onPlayerCollide(player : Player){}
        public onEnemyCollide(enemy : Enemy){}
        public onProjectileCollide(projectile : Projectile){}
        public onWallCollide(wall : Phaser.GameObjects.TileSprite){}
        public isDanger() : boolean {return false}
    }

    export class Danger extends LevelObject {

        constructor(scene : BaseLevel, x: number, y : number){
            super(scene, x, y, "obstacle")

            this.setScale(2, 2)
        }

        public onPlayerCollide(player : Player){
            player.gotHit()
        }

        public onEnemyCollide(enemy : Enemy){
            enemy.hitByDanger()
        }

        public isDanger() : boolean {return true}
    }

    export class Goal extends LevelObject {
        constructor(scene : BaseLevel, x: number, y : number){
            super(scene, x, y, "goal")

            this.setScale(2, 2)
        }

        public onPlayerCollide(player : Player){
            player.foundGoal()
        }
    }

    export class Crate extends LevelObject {
        //private overlap : Phaser.Physics.Arcade.Image

        //private lastPlayerTouch = 0
        //private positionBeforeTouch = new Phaser.Math.Vector2(0, 0)
        private lastUpdate = 0
        //private downTime = 200
        private lastArrowTouch = 0
        private static moveTime = 50 //ms

        constructor(scene : BaseLevel, x: number, y : number){
            super(scene, x, y, "crate")
        }

        /*public onPlayerCollide(player : Player){
            this.lastPlayerTouch = this.lastUpdate
            this.positionBeforeTouch = this.body.position.clone()
            this.setImmovable()
        }*/

        public onWallCollide(wall : Phaser.GameObjects.TileSprite){
            this.setImmovable()
        }

        public onProjectileCollide(projectile : Projectile){
            this.lastArrowTouch = this.lastUpdate
            this.setImmovable(false)
            let vel = this.getCenter().subtract(projectile.getCenter())
            vel = vel.normalize().scale(projectile.body.velocity.length())
            this.setVelocity(vel.x, vel.y)
        }

        public update(time : number, delta : number){
            /*if(this.lastPlayerTouch + this.downTime < time){
                this.setImmovable(false)
            }

            this.lastUpdate = time*/
            if(this.lastArrowTouch + Crate.moveTime < time){
                this.setImmovable()
            }

            this.lastUpdate = time
        }
    }

    export class ObjectGroup extends Phaser.Physics.Arcade.Group {

        private static dangerDFactor = 0.999
        private static dangerBounce = 0.99
        
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)

            this.runChildUpdate = true
        }

        createDanger(x : number, y : number){
            let danger = new Danger(<BaseLevel>this.scene, x, y)

            super.add(danger, true)

            danger.setCollideWorldBounds(true)

            danger.setDamping(true)
            danger.setDrag(ObjectGroup.dangerDFactor)
            danger.setBounce(ObjectGroup.dangerBounce)
        }

        createGoal(x : number, y : number){
            let goal = new Goal(<BaseLevel>this.scene, x, y)

            super.add(goal, true)

            goal.setCollideWorldBounds(true)
        }

        public createCrate(x : number, y : number){
            let crate = new Crate(<BaseLevel>this.scene, x, y)

            super.add(crate, true)

            crate.setCollideWorldBounds(true)
            
            crate.setDamping(true)
            crate.setDrag(0.75)
            crate.setBounce(0)
        }
    }
}