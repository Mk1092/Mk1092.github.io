namespace GreedyArcher{

    export class levelObject extends Phaser.Physics.Arcade.Image {
        public playerCollide(player : Player){}
        public enemyCollide(enemy : Enemy){}
    }

    export class Danger extends levelObject {
        constructor(scene : BaseLevel, x: number, y : number){
            super(scene, x, y, "obstacle")

            this.setScale(2, 2)
        }

        public playerCollide(player : Player){
            player.gotHit()
        }

        public enemyCollide(enemy : Enemy){
            enemy.hitByDanger()
        }
    }

    export class Goal extends levelObject {
        constructor(scene : BaseLevel, x: number, y : number){
            super(scene, x, y, "goal")

            this.setScale(2, 2)
        }

        public playerCollide(player : Player){
            player.foundGoal()
        }
    }

    export class ObjectGroup extends Phaser.Physics.Arcade.Group {

        private static dFactor = 0.999
        private static bounce = 1
        
        constructor(scene : Phaser.Scene){
            super(scene.physics.world, scene)
        }

        createDanger(x : number, y : number){
            let danger = new Danger(<BaseLevel>this.scene, x, y)

            super.add(danger, true)

            danger.setCollideWorldBounds(true)

            danger.setDamping(true)
            danger.setDrag(ObjectGroup.dFactor)
            danger.setBounce(ObjectGroup.bounce)
        }

        createGoal(x : number, y : number){
            let goal = new Goal(<BaseLevel>this.scene, x, y)

            super.add(goal, true)

            goal.setCollideWorldBounds(true)
        }

        /*addObject(child: Phaser.Physics.Arcade.Image | Phaser.Physics.Arcade.Sprite){
            super.add(child, true)

            child.setCollideWorldBounds(true)

            child.setDamping(true)
            child.setDrag(ObjectGroup.dFactor)
            child.setBounce(ObjectGroup.bounce)
        }*/
    }
}